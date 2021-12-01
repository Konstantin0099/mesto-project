// Создание класса FormValidator
// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
// const dataValidation = {
//     formSelector: ".input-container",
//     inputSelector: ".input-container__item",
//     submitButtonSelector: ".input-container__submit-item",
//     inactiveButtonClass: "input-container__submit-item_disabled",
//     inputErrorClass: "input-container__item_error",
//     errorClass: "popup__error_visible",
//   }
export default class FormValidator {
  constructor(dataValidation, itemForm) {
    this.dataValidation = dataValidation;
    this._itemForm = itemForm;
  }

  enableValidation(name) {
    this.forma = document.forms[name];
    this.inputList = Array.from(
      this.forma.querySelectorAll(`${this.dataValidation.inputSelector}`)
    );
    this.inputList.forEach((inputItem) => {
      this._inputItem = inputItem;
      this._inputItem.addEventListener("input", this.hasValid);
    });
    this.forma.querySelector(
      `${this.dataValidation.submitButtonSelector}`
    ).disabled = true;
  }///
  addErrorInput = () => {
    this.form.form.classList.add(`${this.dataValidation.errorClass}`); // при ошибке стилизуеи инпуты
    this.form.error.classList.add(`${this.dataValidation.inputErrorClass}`); // при ошибке стилизуем поле Error
    this.form.error.textContent = this.form.messageError; // пишем причину невальдности
    this.form.buttonSubmit.classList.add(
      `${this.dataValidation.inactiveButtonClass}`
    ); // стилизуем неактивную кнопку
    this.disableButton(); // делаем кнпку неактивной
  };///
  deleteErrorInput = () => {
    // убираем стили ошибки поля Error и отчищаем
    this.form.error.classList.remove(`${this.dataValidation.inputErrorClass}`);
    this.form.error.textContent = "";
  };///

  disableButton = () => {
    // функция, делает кнопку переданной формы неактивной
    this.form.buttonSubmit.disabled = true;
  };
  activateButton = () => {
    // функция, делает кнопку переданной формы активной
    this.form.buttonSubmit.disabled = false;
  };
  hasValidForm = () => {
    //  проверяет валидность всех полей формы
    return this.inputList.every((input) => {
      return input.validity.valid;
    });
  };
  hasValidinput = () => {
    //  проверяет валидность поля ввода
    if (!this._inputItem.validity.valid) {
      this.addErrorInput();
      return false;
    } else {
      this.deleteErrorInput();
      return true;
    }
  };
  hasValid = (evt) => {
    // проверяет на валидность форму, на которой произошло событие "input"
    // debugger;
    this.form = {
      form: this.forma,
      input: evt.target,
      error: this.forma.querySelector(`.${evt.target.id}-error`),
      messageError: evt.target.validationMessage,
      buttonSubmit: this.forma.querySelector(
        `${this.dataValidation.submitButtonSelector}`
      ),
    };
    if (this.hasValidinput()) {
      if (this.hasValidForm()) {
        this.activateButton();
      } else {
        this.disableButton();
      }
    } else {
      this.disableButton();
    }
  };
}
