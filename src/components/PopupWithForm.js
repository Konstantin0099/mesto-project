import Popup from "./Popup";

// Создайте класс PopupWithForm, который наследуется от Popup
export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  constructor(selector, editData, initData) {
    super(selector);
    this._editData = editData;
    this._initData = initData;
    this._form = this._popup.querySelector('form');
  }

// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const formData = {}
    Array.from(this._form.elements).forEach(item => {
      if(item.tagName === 'INPUT') {
        formData[item.name] = item.value;
      }
    })
return formData;
  
  }
  

  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    // console.log("функция колбек__________", this._editData);
    // console.log("функция колбек__________", this._initData);
    super.setEventListeners();
    // добавлять обработчик сабмита формы.
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const formData = this._getInputValues();
      // console.log("функция колбек__принимает на вход___formData____", formData);
      console.log("функция колбек__принимает на вход___formData____", this._editData);

      this._editData(formData).then((res) => {
        console.log("функция колбек___принимает на вход_______", res);
        this._initData(res)});

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