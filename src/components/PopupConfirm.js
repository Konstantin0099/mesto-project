import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector("form");// используется в index.js
    this._saveBtn = this._form.querySelector(".input-container__submit-item");
  }

  open(id) {
    super.open();
    this._saveBtn.focus();

    this._cardId = id;
    // this.form.dataset.deleteCardId = id;
  }

  renderLoading(text) {
    this._saveBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this.renderLoading("Удаление...");
      // const cardId = this.form.dataset.deleteCardId;
      this._callback(this._cardId);
    })
  }


  close() {
    super.close();
  }
}
