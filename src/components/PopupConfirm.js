import Popup from "./Popup";
import {renderLoading} from "../utils/utils";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this.form = this._popup.querySelector("form");
    this.saveBtn = this.form.querySelector(".input-container__submit-item");
  }

  open() {
    super.open();
    this.saveBtn.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", evt => {
      evt.preventDefault();
      const popup = this;
      renderLoading(this.saveBtn, "Удаление...");
      const cardId = this.form.dataset.deleteCardId;
      this._callback(cardId, this);
    })
  }


  close() {
    super.close();
    this.form.reset();
  }
}
