import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('form');
    this._saveBtn = this._form.querySelector('.input-container__submit-item');
  }

  _getInputValues() {
    const formData = {}
    Array.from(this._form.elements).forEach(item => {
      if (item.tagName === 'INPUT') {
        formData[item.name] = item.value;
      }
    })
    return formData;
  }

  open() {
    super.open();
    this._saveBtn.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      const popup = this;
      evt.preventDefault();
      const formData = this._getInputValues();
      this._saveBtn.textContent = 'Сохранение...';
      this._callback(formData, popup);
    })
  }

  setEventListenersRemove() {
    super.setEventListeners();
    // добавлять обработчик сабмита формы.
    this._form.addEventListener('submit', evt => {
      const popup = this;
      evt.preventDefault();
      this._saveBtn.textContent = 'Удаление...';
      const cardId = this._form.dataset.deleteCardId;
      this._callback(cardId, popup);
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
