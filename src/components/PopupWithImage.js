import Popup from "./Popup";

// Создайте класс PopupWithImage, который наследует от Popup.
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popup.querySelector('.img-popup');
    this._captionElement = this._popup.querySelector('.popup-figcaption');
    console.log(this._imageSrc)
    console.log(this._caption)
  }

// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(link, name) {
    super.open();
    this._imageElement.src = link;
    this._captionElement.textContent = name
    // + вставлять в попап картинку с src изображения и подписью к картинке.
  }
}