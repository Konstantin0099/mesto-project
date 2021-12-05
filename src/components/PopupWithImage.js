import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popup.querySelector('.img-popup');
    this._captionElement = this._popup.querySelector('.popup-figcaption');
  }

  open(link, name) {
    super.open();
    this._imageElement.src = link;
    this._captionElement.textContent = name
  }
}