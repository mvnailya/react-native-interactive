/* Учебный материал адаптирован из лекции «Компоненты и props в React Native», слайды 2–32. */
window.LESSONS = [
{title:'Компоненты и JSX', slides:'2–3', theory:`<p><strong>Компонент</strong> — самостоятельная часть интерфейса. Функциональный компонент — функция JavaScript, возвращающая JSX-разметку. Имя пользовательского компонента пишется с заглавной буквы.</p><p>Встроенные компоненты React Native включают View, Text, Image и другие. View создаёт контейнер, а Text отображает текст. JSX напоминает HTML, но в мобильном React Native используются компоненты, а не HTML-теги.</p><p>Экран можно разделить на CatalogScreen, SearchField, FlatList и ProductCard. Такое вложение называется <strong>деревом компонентов</strong>. Один компонент разрешается использовать много раз.</p>`,example:`import { View, Text } from 'react-native';
function ProductCard() {
  return <View><Text>Наушники</Text><Text>2500 ₽</Text></View>;
}
// В JSX родительского компонента:
<ProductCard />`,explain:'ProductCard описывает одну карточку. View объединяет содержимое, а два Text выводят название и цену. При повторном использовании будут повторяться одинаковые данные.',quiz:'Как правильно назвать собственный компонент?',answers:['productCard','ProductCard','product-card','text'],correct:1,wrong:'В JSX имена пользовательских компонентов должны начинаться с заглавной буквы. Имя с маленькой буквы React интерпретирует иначе.',task:'Создайте функциональный компонент CourseTitle, который возвращает View с Text «Основы React Native».',starter:'function CourseTitle() {\n  // ваш код\n}',must:['function CourseTitle','<View','<Text','Основы React Native'],solution:`function CourseTitle() {
  return <View><Text>Основы React Native</Text></View>;
}`,tip:'Нужны function, return и JSX внутри View.'},
{title:'Зачем нужны props',slides:'4–5',theory:`<p>Если карточки имеют одинаковую структуру, но разные данные, копирование разметки приводит к дублированию. <strong>Props</strong> (properties) позволяют передавать входные данные компоненту извне.</p><p>React собирает переданные свойства в объект <code>props</code>. Значения читаются через точку: <code>props.title</code>, <code>props.price</code>. В JSX выражения JavaScript помещают в фигурные скобки.</p><p>Родитель задаёт содержимое, дочерний компонент описывает, как его отобразить. При отсутствии свойства его значение обычно <code>undefined</code>.</p>`,example:`function ProductCard(props) {
  return <View>
    <Text>{props.title}</Text>
    <Text>{props.price} ₽</Text>
  </View>;
}
<ProductCard title="Наушники" price={2500} />
<ProductCard title="Чехол" price={900} />`,explain:'Обе карточки создаются одной функцией. При первом вызове title равен «Наушники», при втором — «Чехол». Значения передаются как поля объекта props.',quiz:'Что будет содержаться в props.title для <ProductCard title="Чехол" />?',answers:['Имя компонента','Строка «Чехол»','undefined всегда','Объект JSX'],correct:1,wrong:'Имя атрибута title превращается в одноимённое свойство props. Его значение — переданная строка.',task:'Напишите компонент PriceTag, принимающий props и отображающий props.price с символом ₽.',starter:'function PriceTag(props) {\n  // ваш код\n}',must:['function PriceTag','props.price','<Text'],solution:`function PriceTag(props) {
  return <Text>{props.price} ₽</Text>;
}`,tip:'Используйте {props.price} внутри Text.'},
{title:'Типы данных в props',slides:'6',theory:`<p>Через props можно передавать строки, числа, логические значения, объекты, массивы и функции. Строку удобно записать как <code>title="Наушники"</code>, число — как <code>price={2500}</code>.</p><p>В фигурных скобках JSX располагается выражение JavaScript. Поэтому <code>price="2500"</code> — строка, а <code>price={2500}</code> — число. Для объекта, созданного прямо в JSX, видны две пары скобок: внешняя — JSX, внутренняя — объект.</p><p>Целый объект product удобно передать одним свойством, вместо перечисления десятков полей.</p>`,example:`const product = { title: 'Чехол', price: 900 };
<ProductCard
  title="Чехол"
  price={900}
  available={true}
  product={product}
  tags={['хит', 'новинка']}
  onAdd={handleAdd}
/>`,explain:'Строка передаётся в кавычках; все остальные показанные значения — через JavaScript-выражения. onAdd получает ссылку на функцию, а не результат её немедленного вызова.',quiz:'Как передать числовое значение 1200?',answers:['price="1200"','price={1200}','price=(1200)','price=[1200]'],correct:1,wrong:'Кавычки означают строку. Число в JSX передаётся через фигурные скобки.',task:'Создайте использование ProductCard, передав title «Книга», price числом 1200 и available значением false.',starter:'<ProductCard\n  // props\n/>',must:['ProductCard','title="Книга"','price={1200}','available={false}'],solution:`<ProductCard
  title="Книга"
  price={1200}
  available={false}
/>`,tip:'Число и false нужно поместить в фигурные скобки.'},
{title:'Деструктуризация и значения по умолчанию',slides:'7',theory:`<p>При работе с объектом props можно многократно писать <code>props.title</code>, а можно извлечь поля сразу в параметрах функции. Это называется <strong>деструктуризацией объекта</strong>.</p><p>Запись <code>function ProductCard({ title, price })</code> создаёт локальные переменные title и price, полученные из props. Выражение <code>inStock = true</code> задаёт значение по умолчанию.</p><p>Значение по умолчанию применяется, если свойство отсутствует или равно undefined. Переданное false, 0 или null не заменяется значением по умолчанию.</p>`,example:`function ProductCard({ title, price, inStock = true }) {
  return <View>
    <Text>{title}</Text>
    <Text>{price} ₽</Text>
    <Text>{inStock ? 'В наличии' : 'Нет в наличии'}</Text>
  </View>;
}`,explain:'Объект props разобран в списке параметров. Если inStock не передан, он true. Тернарный оператор выбирает текст в зависимости от наличия.',quiz:'Что будет в inStock, если родитель передал inStock={false}?',answers:['true','false','undefined','Ошибка'],correct:1,wrong:'Значение по умолчанию используется только при undefined. Явно переданное false сохраняется.',task:'Напишите заголовок функции Badge, извлекая label и color со значением по умолчанию "blue", и верните Text с label.',starter:'function Badge(/* параметры */) {\n  // ваш код\n}',must:['function Badge','label','color =','blue','<Text'],solution:`function Badge({ label, color = 'blue' }) {
  return <Text style={{ color }}>{label}</Text>;
}`,tip:'Деструктуризация: { label, color = "blue" }.'},
{title:'Поток данных и функции',slides:'8–9',theory:`<p>В React данные передаются <strong>от родителя к дочернему компоненту</strong>. Дочерние компоненты не должны изменять полученные props. Новые данные передаются родителем при следующем рендере.</p><p>Если дочерний компонент должен сообщить о нажатии, родитель передаёт ему функцию. Функция является значением JavaScript, поэтому её можно передавать как любое другое свойство.</p><p><code>onAdd={handleAdd}</code> передаёт функцию. <code>onAdd={handleAdd()}</code> вызывает её сразу при вычислении JSX. Для аргументов удобна стрелочная функция: <code>() => addToCart(product)</code>.</p>`,example:`function ProductCard({ onAdd }) {
  return <Pressable onPress={onAdd}>
    <Text>Добавить</Text>
  </Pressable>;
}
// Родитель:
<ProductCard onAdd={() => addToCart(product)} />`,explain:'Родитель решает, что делать с товаром. ProductCard лишь вызывает onAdd при нажатии. Так логика корзины не дублируется в каждой карточке.',quiz:'Какая запись передаст обработчик, не вызывая его сразу?',answers:['onAdd={addToCart(product)}','onAdd={handleAdd()}','onAdd={() => addToCart(product)}','onAdd="handleAdd"'],correct:2,wrong:'Круглые скобки после имени функции вызывают её немедленно. Стрелочная функция откладывает вызов до события.',task:'Напишите Pressable с обработчиком, который при нажатии вызывает saveItem(item). Внутри покажите Text «Сохранить».',starter:'<Pressable onPress={/* ... */}>\n  ...\n</Pressable>',must:['<Pressable','onPress','=>','saveItem(item)','<Text','Сохранить'],solution:`<Pressable onPress={() => saveItem(item)}>
  <Text>Сохранить</Text>
</Pressable>`,tip:'onPress={() => saveItem(item)}.'},
{title:'Композиция и children',slides:'10–12',theory:`<p><strong>Композиция</strong> означает сборку сложного интерфейса из более простых компонентов. Например, ProductCard состоит из Image, ProductInfo и Pressable. Каждый компонент выполняет собственную задачу.</p><p>Специальное свойство <code>children</code> содержит элементы, помещённые между открывающим и закрывающим тегами компонента. Компонент-обёртка может отображать их внутри своего контейнера.</p><p>Универсальный Card не знает заранее своего содержимого. Он определяет только общую визуальную рамку. Один и тот же Card подходит и для товара, и для информации о заказе.</p>`,example:`function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}
function ProductCard({ product, onAdd }) {
  return <Card>
    <Image source={product.image} style={styles.image} />
    <ProductInfo title={product.title} price={product.price} />
    <Pressable onPress={onAdd}><Text>Добавить</Text></Pressable>
  </Card>;
}`,explain:'ProductCard собирает три вложенных элемента. Card предоставляет общий контейнер через props.children, а данные и обработчик поступают от родителя через props.',quiz:'Что попадёт в props.children компонента <Card><Text>Привет</Text></Card>?',answers:['Только строка Card','Вложенный элемент Text','Всегда undefined','Функция onPress'],correct:1,wrong:'children — это содержимое между тегами пользовательского компонента.',task:'Создайте компонент Panel, который принимает children и оборачивает их в View со стилем styles.panel.',starter:'function Panel({ children }) {\n  // ваш код\n}',must:['function Panel','children','<View','styles.panel','{children}'],solution:`function Panel({ children }) {
  return <View style={styles.panel}>{children}</View>;
}`,tip:'Выведите {children} внутри View.'},
{title:'View и Text',slides:'13–15',theory:`<p>React Native включает встроенные компоненты View, Text, Image, Pressable, TextInput, ScrollView и FlatList. Выбор зависит от задачи.</p><p><strong>View</strong> — основной контейнер, аналог div по назначению; объединяет элементы, поддерживает стили и Flexbox. <strong>Text</strong> выводит текст; обычный текст нельзя помещать непосредственно внутрь View.</p><p>Значения JavaScript выводятся в Text через фигурные скобки. Один Text можно вкладывать в другой, чтобы оформлять отдельный фрагмент. Выражение <code>{' '}</code> добавляет пробел.</p>`,example:`<View style={styles.card}>
  <Text style={styles.title}>{product.title}</Text>
  <Text>{product.price} ₽{' '}
    <Text style={styles.sale}>Скидка 20%</Text>
  </Text>
</View>`,explain:'View объединяет карточку. Text выводит поля объекта. Вложенный Text позволяет выделить скидку отдельным стилем, а {\' \'} создаёт пробел.',quiz:'Как корректно вывести надпись внутри View?',answers:['<View>Привет</View>','<View><Text>Привет</Text></View>','<View>{Привет}</View>','<div>Привет</div>'],correct:1,wrong:'В React Native текстовые узлы должны находиться внутри компонента Text.',task:'Напишите View с двумя Text: один выводит product.title, другой product.price и знак ₽.',starter:'<View>\n  ...\n</View>',must:['<View','<Text','product.title','product.price'],solution:`<View>
  <Text>{product.title}</Text>
  <Text>{product.price} ₽</Text>
</View>`,tip:'Оба текстовых значения оберните в Text.'},
{title:'Image: изображения',slides:'16',theory:`<p><strong>Image</strong> отображает локальные и сетевые изображения. Для локального файла укажите статический <code>require('./img/case.png')</code>. Для сетевого изображения используйте объект <code>{ uri: адрес }</code>.</p><p>Сетевым изображениям необходимо задавать размеры, поскольку их естественные размеры заранее неизвестны. У изображений, подключённых статическим require, размеры могут определяться автоматически.</p><p><code>resizeMode="cover"</code> заполняет область, при необходимости обрезая части изображения. <code>resizeMode="contain"</code> показывает его целиком, но может оставлять свободные поля.</p>`,example:`<Image source={require('./img/case.png')} style={styles.image} />
<Image
  source={{ uri: product.imageUrl }}
  style={{ width: 150, height: 150 }}
  resizeMode="contain"
/>`,explain:'Первое изображение берётся из проекта. Второе загружается по URL из product.imageUrl. contain сохраняет всё изображение в пределах рамки.',quiz:'Как правильно передать URL изображения?',answers:['source="https://site.test/img.png"','source={{ uri: imageUrl }}','source={imageUrl}','source={require(imageUrl)}'],correct:1,wrong:'Сетевой адрес передаётся в объекте со свойством uri. Статический require предназначен для локальных файлов.',task:'Напишите Image для сетевого адреса photoUrl, задайте ширину и высоту по 120, resizeMode="cover".',starter:'<Image\n  ...\n/>',must:['<Image','uri: photoUrl','width: 120','height: 120','cover'],solution:`<Image
  source={{ uri: photoUrl }}
  style={{ width: 120, height: 120 }}
  resizeMode="cover"
/>`,tip:'Используйте source={{ uri: photoUrl }}.'},
{title:'Состояние и useState',slides:'17',theory:`<p>Props поступают извне, а <strong>состояние (state)</strong> — это изменяющиеся данные самого компонента. Например, компоненту нужно запомнить факт нажатия и показать сообщение.</p><p>Хук <code>useState</code> из React возвращает пару: текущее значение и функцию обновления. <code>const [added, setAdded] = useState(false)</code> создаёт логическое состояние с начальным значением false.</p><p>Вызов setAdded(true) обновляет состояние и при необходимости вызывает новый рендер. Выражение <code>added && &lt;Text&gt;...&lt;/Text&gt;</code> отображает сообщение, только когда added истинно.</p>`,example:`import { useState } from 'react';
function ProductCard() {
  const [added, setAdded] = useState(false);
  return <View>
    <Pressable onPress={() => setAdded(true)}>
      <Text>Добавить</Text>
    </Pressable>
    {added && <Text>Товар добавлен</Text>}
  </View>;
}`,explain:'В начале added=false, поэтому сообщения нет. После нажатия setAdded(true) инициирует обновление, и условное выражение показывает текст.',quiz:'Для чего нужен setAdded в useState?',answers:['Импортировать View','Изменить значение состояния','Получить props','Сделать стиль'],correct:1,wrong:'Первый элемент пары — текущее состояние, второй — функция его обновления.',task:'Создайте состояние visible со стартовым false и Pressable, который устанавливает visible в true.',starter:'// внутри компонента\nconst [...] = useState(...);\n<Pressable ...><Text>Показать</Text></Pressable>',must:['visible','setVisible','useState(false)','onPress','setVisible(true)'],solution:`const [visible, setVisible] = useState(false);
<Pressable onPress={() => setVisible(true)}>
  <Text>Показать</Text>
</Pressable>`,tip:'const [visible, setVisible] = useState(false).'},
{title:'Pressable: нажатие и доступность',slides:'18',theory:`<p><strong>Pressable</strong> создаёт интерактивную область, реагирующую на нажатие. Свойство <code>onPress</code> получает функцию-обработчик.</p><p><code>disabled={!product.available}</code> делает область неактивной, когда товар отсутствует. Стили могут определяться функцией <code>({ pressed }) => ...</code>, где pressed означает нажатое состояние.</p><p>Сочетание базовых и условных стилей помогает показывать визуальную обратную связь. Внешнее оформление недоступной кнопки и блокирование нажатий — разные задачи.</p>`,example:`<Pressable
  onPress={() => setAdded(true)}
  disabled={!product.available}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed
  ]}
>
  <Text>Добавить</Text>
</Pressable>`,explain:'Кнопка вызывает setAdded при нажатии. При available=false свойство disabled блокирует её. pressed позволяет изменять оформление только в момент нажатия.',quiz:'Когда disabled={!product.available} будет true?',answers:['Когда товар доступен','Когда product.available равно false','Всегда','Когда кнопку нажали'],correct:1,wrong:'Оператор ! инвертирует логическое значение. !false — true, поэтому кнопка будет отключена.',task:'Создайте Pressable с onPress={handleClick}, отключаемый при !available, внутри Text «Открыть».',starter:'<Pressable ...>\n ...\n</Pressable>',must:['<Pressable','onPress={handleClick}','disabled={!available}','<Text','Открыть'],solution:`<Pressable onPress={handleClick} disabled={!available}>
  <Text>Открыть</Text>
</Pressable>`,tip:'Укажите onPress и disabled прямо в открывающем теге.'},
{title:'TextInput: управляемый ввод',slides:'19',theory:`<p><strong>TextInput</strong> принимает текст с клавиатуры. <code>placeholder</code> показывает подсказку до ввода. Для связи со состоянием используются <code>value</code> и <code>onChangeText</code>.</p><p>В управляемом поле значение value берётся из состояния, а обработчик onChangeText получает введённый текст и обновляет состояние. Это позволяет в другом месте интерфейса отображать запрос или фильтровать товары.</p><p>Дополнительные свойства: <code>keyboardType</code> (тип клавиатуры), <code>secureTextEntry</code> (скрытие символов), <code>multiline</code> (многострочный ввод).</p>`,example:`const [query, setQuery] = useState('');
<TextInput
  placeholder="Поиск товаров"
  value={query}
  onChangeText={setQuery}
/>
<Text>Ищем: {query}</Text>`,explain:'Когда пользователь вводит «чех», TextInput вызывает setQuery("чех"). Состояние обновляется, а Text показывает «Ищем: чех».',quiz:'Какое свойство TextInput вызывается при изменении текста?',answers:['onPress','keyExtractor','onChangeText','resizeMode'],correct:2,wrong:'onChangeText получает новую строку при изменении поля; value задаёт её текущее значение.',task:'Создайте управляемый TextInput для состояния email/setEmail с placeholder="Эл. почта" и keyboardType="email-address".',starter:'const [email, setEmail] = useState(\'\');\n<TextInput ... />',must:['useState','email','setEmail','<TextInput','value={email}','onChangeText={setEmail}','email-address'],solution:`const [email, setEmail] = useState('');
<TextInput
  placeholder="Эл. почта"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>`,tip:'Свяжите value с email, onChangeText — с setEmail.'},
{title:'ScrollView и FlatList',slides:'20–22',theory:`<p><strong>ScrollView</strong> подходит для небольшой страницы с разнородными блоками: изображение, описание, характеристики. Он создаёт вложенное содержимое сразу. Свойство <code>contentContainerStyle</code> оформляет обёртку содержимого, <code>horizontal</code> включает горизонтальную прокрутку.</p><p><strong>FlatList</strong> эффективен для длинного однотипного списка. <code>data</code> получает массив, <code>renderItem</code> — функцию отрисовки одной карточки, <code>keyExtractor</code> — устойчивый уникальный ключ.</p><p>FlatList использует виртуализацию: поддерживает ограниченное окно элементов на экране и рядом. Для каталога из сотен товаров выбирают FlatList, для страницы одного товара — ScrollView.</p>`,example:`<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <ProductCard product={item} onAdd={() => addProduct(item)} />
  )}
/>`,explain:'Для каждого отображаемого элемента из products вызывается renderItem. item — конкретный товар. Его id используется как ключ, а onAdd вызывает добавление именно этого товара.',quiz:'Какой компонент лучше выбрать для каталога из 400 товаров?',answers:['ScrollView с 400 вручную написанными карточками','FlatList с data и renderItem','TextInput','Image'],correct:1,wrong:'FlatList создан для длинных однотипных списков и использует виртуализацию.',task:'Напишите FlatList, который получает массив courses, использует item.id и выводит CourseCard с prop course={item}.',starter:'<FlatList\n  ...\n/>',must:['<FlatList','data={courses}','keyExtractor','item.id','renderItem','CourseCard','course={item}'],solution:`<FlatList
  data={courses}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <CourseCard course={item} />}
/>`,tip:'Нужны data, keyExtractor и renderItem.'},
{title:'Стилизация и StyleSheet',slides:'23–24',theory:`<p>В React Native стили — объекты JavaScript, передаваемые через prop <code>style</code>. Имена записываются в camelCase: backgroundColor, borderRadius, fontSize. Числовые размеры обычно указываются без px.</p><p>Inline-стиль <code>style={{ padding: 16 }}</code> удобен в небольшом примере, но для повторного использования применяют <code>StyleSheet.create()</code>. Он создаёт именованные наборы стилей.</p><p>Стиль может задавать цвет, размеры, внутренние отступы, скругление, размер и насыщенность шрифта. <code>gap</code> определяет расстояния между дочерними элементами контейнера.</p>`,example:`const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  title: { fontSize: 16, fontWeight: '600' }
});
<View style={styles.card}>
  <Text style={styles.title}>Товар</Text>
</View>`,explain:'StyleSheet.create группирует именованные стили. styles.card задаёт фон и отступы, styles.title — оформление текста. Одни и те же стили можно применить многократно.',quiz:'Как правильно называется стилевое свойство цвета фона?',answers:['background-color','BackgroundColor','backgroundColor','background_color'],correct:2,wrong:'В JavaScript-объектах стилей React Native используется camelCase — backgroundColor.',task:'Создайте StyleSheet с card: padding 16 и backgroundColor "#FFFFFF", затем примените styles.card к View.',starter:'const styles = StyleSheet.create({ ... });\n<View ...></View>',must:['StyleSheet.create','card:','padding: 16','backgroundColor','styles.card','<View'],solution:`const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#FFFFFF' }
});
<View style={styles.card}></View>`,tip:'Создайте поле card внутри StyleSheet.create.'},
{title:'Условные стили',slides:'25',theory:`<p>Свойство <code>style</code> может получать массив объектов. Стили применяются по порядку: поздние значения перекрывают совпадающие свойства предыдущих.</p><p>Условная запись <code>selected && styles.cardSelected</code> подключает дополнительный стиль только при истинном selected. Значения false и null внутри массива стилей пропускаются.</p><p>Это удобно для выбранных карточек, нажатых или недоступных кнопок. Для Pressable стиль может быть функцией, принимающей <code>pressed</code>.</p>`,example:`<Pressable
  disabled={!product.available}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
    !product.available && styles.buttonDisabled
  ]}
><Text>Добавить</Text></Pressable>`,explain:'Базовый стиль действует всегда. Во время нажатия добавляется buttonPressed, а при недоступности товара — buttonDisabled. disabled отдельно запрещает нажатие.',quiz:'Какой фон победит в style={[{backgroundColor:"white"},{backgroundColor:"blue"}]}?',answers:['Белый','Синий','Прозрачный','Будет ошибка'],correct:1,wrong:'При одинаковом свойстве последнее значение массива стилей имеет приоритет.',task:'Напишите View с массивом стилей: базовый styles.card и дополнительный styles.selected только при isSelected.',starter:'<View style={[ ... ]} />',must:['<View','styles.card','isSelected','styles.selected'],solution:`<View style={[styles.card, isSelected && styles.selected]} />`,tip:'Добавьте условное выражение через && в массив.'},
{title:'Flexbox: оси и выравнивание',slides:'26–27',theory:`<p><strong>Flexbox</strong> определяет размещение дочерних элементов контейнера. У него две оси: главная и поперечная. <code>flexDirection: 'column'</code> (по умолчанию в React Native) направляет главную ось сверху вниз, <code>'row'</code> — горизонтально.</p><p><code>justifyContent</code> выравнивает элементы вдоль главной оси: flex-start, center, flex-end, space-between. <code>alignItems</code> работает по поперечной оси: stretch, center и другие. <code>alignSelf</code> переопределяет выравнивание одного элемента.</p><p>При изменении flexDirection физические направления обеих осей меняются.</p>`,example:`<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  <Text>{product.price} ₽</Text>
  <Pressable><Text>Добавить</Text></Pressable>
</View>`,explain:'Строка размещает цену слева и кнопку справа. space-between разводит элементы вдоль главной горизонтальной оси, alignItems центрирует их по вертикали.',quiz:'При flexDirection="row" вдоль какой оси действует justifyContent?',answers:['Вертикальной','Горизонтальной (главной)','Только поперечной','Не действует'],correct:1,wrong:'justifyContent всегда действует вдоль главной оси. При row она горизонтальна.',task:'Напишите View с flexDirection="row", justifyContent="space-between" и alignItems="center".',starter:'<View style={{ ... }}>\n  ...\n</View>',must:['<View','flexDirection','row','justifyContent','space-between','alignItems','center'],solution:`<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <Text>Цена</Text>
  <Text>Кнопка</Text>
</View>`,tip:'Все три свойства находятся в объекте style.'},
{title:'Гибкость и адаптивность',slides:'28–29',theory:`<p><code>flex</code> помогает распределять доступное пространство: при равных условиях элементы flex:1 и flex:1 получают равные доли, flex:1 и flex:2 — отношение 1:2. <code>flexGrow</code> управляет ростом, <code>flexShrink</code> — сжатием, <code>flexBasis</code> — базовым размером.</p><p><code>gap</code> задаёт промежутки между элементами. <code>flexWrap: 'wrap'</code> позволяет переносить элементы на следующую строку.</p><p><strong>Адаптивность</strong> достигается гибкими размерами, процентными значениями, maxWidth, aspectRatio и хуком <code>useWindowDimensions</code>. Ширина окна обновляется при смене ориентации устройства.</p>`,example:`const { width } = useWindowDimensions();
const isWide = width >= 700;
<View style={[styles.card, isWide && styles.cardHorizontal]} />

// styles.card: { flexDirection: 'column' }
// styles.cardHorizontal: { flexDirection: 'row' }`,explain:'При ширине меньше 700 применяется вертикальный стиль. При ширине от 700 добавляется горизонтальный. Дизайн меняется по размеру окна.',quiz:'Что вернёт isWide при ширине 600 и условии width >= 700?',answers:['true','false','700','undefined'],correct:1,wrong:'600 меньше 700, значит логическое выражение width >= 700 возвращает false.',task:'Напишите код получения width из useWindowDimensions и булеву переменную isWide, истинную при width >= 700.',starter:'const { ... } = useWindowDimensions();\nconst isWide = ...;',must:['useWindowDimensions()','width','isWide','>= 700'],solution:`const { width } = useWindowDimensions();
const isWide = width >= 700;`,tip:'Используйте деструктуризацию { width }.'},
{title:'Каталог: интеграция и ошибки',slides:'30–32',theory:`<p>Итоговый экран <strong>CatalogScreen</strong> объединяет SearchField, FlatList и ProductCard. Поисковое состояние <code>query</code> обновляется через setQuery. Массив <code>visible</code> получают фильтрацией массива товаров по названию.</p><p>FlatList рендерит карточки с уникальными id. Функция onAdd вызывается при нажатии и получает именно текущий товар. Оформление создаётся через StyleSheet и Flexbox.</p><p>Типичные ошибки: изменение props, вызов обработчика при рендере, текст вне Text, неверный source изображения, нестабильные ключи списка, жёсткая ширина, выходящая за пределы экрана.</p>`,example:`const [query, setQuery] = useState('');
const visible = products.filter(p =>
  p.title.toLowerCase().includes(query.toLowerCase())
);
<View style={styles.screen}>
  <SearchField value={query} onChange={setQuery} />
  <FlatList data={visible} keyExtractor={item => item.id}
    renderItem={({item}) => <ProductCard product={item}
      onAdd={() => addProduct(item)} />} />
</View>`,explain:'По мере изменения query фильтрация пересчитывает visible; FlatList показывает только подходящие товары. Выбранный item передаётся обработчику addProduct.',quiz:'Что следует исправить в onAdd={addProduct(item)}?',answers:['Заменить на onAdd={() => addProduct(item)}','Удалить prop product','Использовать индекс вместо id','Добавить кавычки вокруг item'],correct:0,wrong:'Запись addProduct(item) вызывает функцию сразу. Оберните вызов в стрелочную функцию для выполнения по событию.',task:'Составьте выражение фильтрации products по query с использованием filter, toLowerCase и includes. Сохраните результат в visible.',starter:'const visible = products. ...;',must:['const visible','products.filter','title','toLowerCase()','includes(','query.toLowerCase()'],solution:`const visible = products.filter(product =>
  product.title.toLowerCase().includes(query.toLowerCase())
);`,tip:'Примените filter к products и includes к названию.'}
];
window.STAGES=[['theory','Теория'],['example','Пример'],['quiz','Проверочный вопрос'],['mistake','Разбор ошибки'],['task','Самостоятельное задание'],['result','Результат']];
