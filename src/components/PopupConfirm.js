import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector("form");
    this._saveBtn = this._form.querySelector(".input-container__submit-item");
  }
  open(cardId) {
    super.open();
    this._saveBtn.focus();
    this._cardId = cardId;
  }

  renderLoading(text) {
    this._saveBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this.renderLoading("Удаление...");
      this._callback(this._cardId);
    })
  }

  close() {
    super.close();
  }
}
