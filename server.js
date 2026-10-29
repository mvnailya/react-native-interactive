'use strict';
const http=require('http'), fs=require('fs'), path=require('path'), crypto=require('crypto');
const PORT=Number(process.env.PORT||3000), HOST=process.env.HOST||'0.0.0.0';
const TEACHER_KEY=process.env.TEACHER_KEY||crypto.randomBytes(4).toString('hex');
const ROOM=process.env.ROOM||crypto.randomBytes(3).toString('hex').toUpperCase();
const DATA=path.join(__dirname,'data','progress.json');
let db={students:{}};try{db=JSON.parse(fs.readFileSync(DATA,'utf8'))}catch{}
if(!db.students||typeof db.students!=='object')db={students:{}};
function persist(){let tmp=DATA+'.tmp';fs.writeFileSync(tmp,JSON.stringify(db,null,2));fs.renameSync(tmp,DATA)}
const MIME={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const publicDir=path.join(__dirname,'public');
function send(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj))}
function read(req){return new Promise((resolve,reject)=>{let s='';req.on('data',c=>{s+=c;if(s.length>30000){reject(new Error('Слишком большой запрос'));req.destroy()}});req.on('end',()=>{try{resolve(JSON.parse(s||'{}'))}catch{reject(new Error('Неверный JSON'))}});req.on('error',reject)})}
function clean(v,n=80){return String(v||'').trim().replace(/[<>]/g,'').slice(0,n)}
function authStudent(req){let t=String(req.headers['x-student-token']||'');return Object.values(db.students).find(s=>s.token===t)}
function publicStudent(s){return {id:s.id,name:s.name,group:s.group,created:s.created,updated:s.updated,steps:s.steps,errors:s.errors,attempts:s.attempts,finished:s.finished}}
const steps=['theory','example','quiz','mistake','task','result'];
const server=http.createServer(async(req,res)=>{
try{
const u=new URL(req.url,'http://localhost');
if(u.pathname.startsWith('/api/')){
 if(req.method==='POST'&&u.pathname==='/api/join'){
  let b=await read(req),name=clean(b.name),group=clean(b.group,40);
  if(clean(b.room,20).toUpperCase()!==ROOM)return send(res,403,{error:'Неверный код занятия'});
  if(name.length<2||group.length<2)return send(res,400,{error:'Укажите фамилию, имя и группу'});
  let id=crypto.randomUUID(),token=crypto.randomBytes(24).toString('hex'),now=Date.now();
  let s={id,token,name,group,created:now,updated:now,steps:{},errors:0,attempts:0,finished:false};db.students[id]=s;persist();return send(res,200,{token,student:publicStudent(s)})
 }
 if(req.method==='GET'&&u.pathname==='/api/me'){let s=authStudent(req);return s?send(res,200,{student:publicStudent(s)}):send(res,401,{error:'Необходим вход'})}
 if(req.method==='POST'&&u.pathname==='/api/progress'){
  let s=authStudent(req);if(!s)return send(res,401,{error:'Необходим вход'});
  let b=await read(req),block=Number(b.block),step=clean(b.step,20);
  if(!Number.isInteger(block)||block<0||block>=17||!steps.includes(step))return send(res,400,{error:'Неизвестный этап'});
  let k=String(block);if(!s.steps[k])s.steps[k]={};
  // Never let client decrease earlier completion; valid quiz and task progression tracked server-side.
  let curr=s.steps[k];
  if(step==='quiz'){
    s.attempts++;if(b.correct===true){curr.quiz=true}else{s.errors++;curr.quiz=false;curr.quizFailures=(curr.quizFailures||0)+1}
  }else if(step==='task'){
    s.attempts++;if(b.correct===true){curr.task=true}else{s.errors++;curr.task=false;curr.taskFailures=(curr.taskFailures||0)+1}
  }else{curr[step]=true}
  s.updated=Date.now();persist();return send(res,200,{student:publicStudent(s)})
 }
 if(req.method==='POST'&&u.pathname==='/api/finish'){
  let s=authStudent(req);if(!s)return send(res,401,{error:'Необходим вход'});
  s.finished=true;s.updated=Date.now();persist();return send(res,200,{student:publicStudent(s)})
 }
 if(req.method==='GET'&&u.pathname==='/api/dashboard'){
  if(req.headers['x-teacher-key']!==TEACHER_KEY)return send(res,403,{error:'Неверный пароль преподавателя'});
  return send(res,200,{room:ROOM,students:Object.values(db.students).map(publicStudent),serverTime:Date.now()})
 }
 return send(res,404,{error:'Адрес API не найден'});
}
if(req.method!=='GET')return send(res,405,{error:'Метод не поддерживается'});
let file=u.pathname==='/'?'index.html':decodeURIComponent(u.pathname.slice(1));
let full=path.resolve(publicDir,file);if(!full.startsWith(publicDir+path.sep)&&full!==path.join(publicDir,'index.html'))return send(res,403,{error:'Нет доступа'});
fs.readFile(full,(err,bytes)=>{if(err)return send(res,404,{error:'Файл не найден'});res.writeHead(200,{'Content-Type':MIME[path.extname(full)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(bytes)})
}catch(e){console.error(e);if(!res.headersSent)send(res,500,{error:'Ошибка сервера'})}
});
server.listen(PORT,HOST,()=>{console.log('\n=== Интерактивная лекция React Native ===');console.log('Адрес на этом компьютере: http://localhost:'+PORT);console.log('КОД ЗАНЯТИЯ: '+ROOM);});
