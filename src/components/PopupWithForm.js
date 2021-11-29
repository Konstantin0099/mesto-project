import Popup from "./Popup";
import {API} from "../pages";

// Создайте класс PopupWithForm, который наследуется от Popup
export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  constructor(selector, editData, initData) {
    super(selector);
    this._editData = editData;
    this._initData = initData;
    this._form = this._popup.querySelector('form');
    this._saveBtn = this._form.querySelector('.input-container__submit-item');
  }

// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const formData = {}
    Array.from(this._form.elements).forEach(item => {
      if (item.tagName === 'INPUT') {
        formData[item.name] = item.value;
      }
    })
    return formData;

  }

  setEventListenersRemove(refreshInfo = () => {
  }) {
    super.setEventListeners();
    // добавлять обработчик сабмита формы.
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._saveBtn.textContent = 'Удаление...';
      const cardId = this._form.dataset.deleteCardId;
      API.deleteCard(cardId).then(() => {
        this.close();
        this._saveBtn.textContent = 'Да';
        document.querySelector(`[data-id="${cardId}"]`).remove();
        // refreshInfo(res);
      }
    )
  })
}


  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners(refreshInfo = () => {
  }) {
    super.setEventListeners();
    // добавлять обработчик сабмита формы.
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const formData = this._getInputValues();
        this._saveBtn.textContent = 'Сохранение...';
        this._editData(formData).then(res => {
          API.addNewCard.bind(res);
          this.close();
          this._saveBtn.textContent = 'Сохранить';
          refreshInfo(res);
        });
    })
  }

  // * Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    //+при закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset();
  }


}//конец class PopupWithForm

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.