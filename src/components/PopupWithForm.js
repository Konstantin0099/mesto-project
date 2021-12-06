import Popup from "./Popup";
import {renderLoading} from "../utils/utils";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this.form = this._popup.querySelector("form");
    this.saveBtn = this.form.querySelector(".input-container__submit-item");
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
    this.saveBtn.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", evt => {
      const popup = this;
      evt.preventDefault();
      const formData = this._getInputValues();
      renderLoading(this.saveBtn, "Сохранение...");
      this._callback(formData, popup);
    })
  }


  close() {
    super.close();
    this.form.reset();
  }
}
