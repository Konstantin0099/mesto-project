import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this.form = this._popup.querySelector("form");
    this._saveBtn = this.form.querySelector(".input-container__submit-item");
  }

  _getInputValues() {
    const formData = {}
    Array.from(this.form.elements).forEach(item => {
      if (item.tagName === "INPUT") {
        formData[item.name] = item.value;
      }
    })
    return formData;
  }

  open() {
    super.open();
    this._saveBtn.focus();
    // this._saveBtn.disabled = true;
  }


  renderLoading(text) {
    this._saveBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", evt => {
      // const popup = this;
      evt.preventDefault();
      const formData = this._getInputValues();
      this.renderLoading("Сохранение...");
      this._callback(formData)
      // this._callback(formData, popup)
    })
  }

  close() {
    super.close();
    this.form.reset();
  }
}
