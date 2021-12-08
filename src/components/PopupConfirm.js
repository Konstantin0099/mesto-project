import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this.form = this._popup.querySelector("form");// используется в index.js
    this._saveBtn = this.form.querySelector(".input-container__submit-item");
  }

  open() {
    super.open();
    this._saveBtn.focus();
  }

  renderLoading(text) {
    this._saveBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", evt => {
      evt.preventDefault();
      this.renderLoading("Удаление...");
      const cardId = this.form.dataset.deleteCardId;
      this._callback(cardId, this);
    })
  }


  close() {
    super.close();
  }
}
