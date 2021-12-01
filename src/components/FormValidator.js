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
  constructor(dataValidation, formInstance) {
    this.dataValidation = dataValidation;
    this._validatedForm = formInstance._form;
    this._buttonSubmit = formInstance._saveBtn;
  }
  enableValidation() {
    this.inputList = Array.from(
      this._validatedForm.querySelectorAll(`${this.dataValidation.inputSelector}`)
    );
    this.inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", this.hasValid);
    });
  }///
  addErrorInput = () => {
      this._validatedForm.classList.add(`${this.dataValidation.errorClass}`); // при ошибке стилизуеи инпуты
    this._error.classList.add(`${this.dataValidation.inputErrorClass}`); // при ошибке стилизуем поле Error
    this._error.textContent = this._messageError; // пишем причину невальдности
    this._buttonSubmit.classList.add(
      `${this.dataValidation.inactiveButtonClass}`
    ); // стилизуем неактивную кнопку
    this.disableButton(); // делаем кнпку неактивной
  };///
  deleteErrorInput = () => {
    // убираем стили ошибки поля Error и отчищаем
    this._error.classList.remove(`${this.dataValidation.inputErrorClass}`);
    this._error.textContent = "";
  };///
  disableButton = () => {
    // функция, делает кнопку переданной формы неактивной
    this._buttonSubmit.disabled = true;
  };
  activateButton = () => {
    // функция, делает кнопку переданной формы активной
    this._buttonSubmit.disabled = false;
  };
  hasValidForm = () => {
    
    //  проверяет валидность всех полей формы
    return this.inputList.every((input) => {
      return input.validity.valid;
    });
  };
  hasValidinput = () => {
    //  проверяет валидность поля ввода
    if (!this._input.validity.valid) {
      this.addErrorInput();
      return false;
    } else {
      this.deleteErrorInput();
      return true;
    }
  };
  hasValid = (evt) => {
    // Запускаем проверку на валидность формы, на которой произошло событие "input"
      this._input = evt.target;
      this._error = this._validatedForm.querySelector(`.${evt.target.id}-error`);
      this._messageError = evt.target.validationMessage;
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
