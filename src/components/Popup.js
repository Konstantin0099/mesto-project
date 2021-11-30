export default class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  };

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget
        || evt.target === this._popup.querySelector(".popup__click")) {
        this.close(this._popup);
      }
    });
  }
}// конец class Popup
