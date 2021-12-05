export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget
        || evt.target === this._popup.querySelector(".popup__click")) {
        this.close(this._popup);
      }
    });
  }
}
