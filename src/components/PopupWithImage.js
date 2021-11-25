// класс PopupWithImage
// Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

// Создайте класс PopupWithImage, который наследует от Popup.
export default class PopupWithImage extends Popup {
  constructor(selector, {link, name}) {
    super(selector);
    this.link = link;
    this.name = name;
  }

// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open() {
    super.open();
    // + вставлять в попап картинку с src изображения и подписью к картинке.


  }


}