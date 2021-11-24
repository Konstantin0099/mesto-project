// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
//Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// Вы получаете эти данные от Api. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
// Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.


// Создайте класс Section, который отвечает за отрисовку элементов на странице.
export default class Section {

  // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
// Содержит публичный метод, который отвечает за отрисовку всех элементов.
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
renderItems() {
  // console.log("renderItems_____this._items_______", this._items);
  this._items.forEach(item => this._renderer(item));
  }

// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    // console.log("addItem_______", this);
    this._container.append(element);
  }
  
}// конец class Section
