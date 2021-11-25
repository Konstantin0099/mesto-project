// Создайте класс Section, который отвечает за отрисовку элементов на странице.
export default class Section {

  // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
  // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  constructor({items, renderer}, selector) {
    // Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    this._items = items;
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
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
