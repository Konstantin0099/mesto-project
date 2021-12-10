export default class Section {
  constructor({items, renderer}, selector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._domElements = new DocumentFragment();
    this.items.forEach((item) => {
      this._domElements.append(this._renderer(item));
    });
    this.addItem(this._domElements);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
