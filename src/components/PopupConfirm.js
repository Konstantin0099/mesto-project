import Popup from "./Popup";
import {renderLoading} from "../utils/utils";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector("form");
    this._saveBtn = this._form.querySelector(".input-container__submit-item");
  }

  open() {
    super.open();
    this._saveBtn.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      const popup = this;
      evt.preventDefault();
      renderLoading(this._saveBtn, "Удаление...");
      const cardId = this._form.dataset.deleteCardId;
      this._callback(cardId, popup);
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
