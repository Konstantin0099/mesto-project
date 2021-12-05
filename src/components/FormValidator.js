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
    this._validatedForm = formInstance;
    this._buttonSubmit = this._validatedForm.querySelector(this.dataValidation.submitButtonSelector);
  }

  enableValidation() {
    this._inputList = Array.from(
      this._validatedForm.querySelectorAll(`${this.dataValidation.inputSelector}`)
    );
    this._inputList.forEach((inputItem) => {
      this._disableButton();
      inputItem.addEventListener("input", this._hasValid);
    });
  }///
  _addErrorInput = () => {
    this._input.classList.add(`${this.dataValidation.errorClass}`); // при ошибке стилизуеи инпуты
    this._error.classList.add(`${this.dataValidation.inputErrorClass}`); // при ошибке стилизуем поле Error
    this._error.textContent = this._messageError; // пишем причину невальдности
    this._buttonSubmit.classList.add(
      `${this.dataValidation.inactiveButtonClass}`
    ); // стилизуем неактивную кнопку
    this._disableButton(); // делаем кнпку неактивной
  };///
  _deleteErrorInput = () => {
    // убираем стили ошибки поля Error и отчищаем
    this._error.classList.remove(`${this.dataValidation.inputErrorClass}`);
    this._error.textContent = "";
  };///
  _disableButton = () => {
    // функция, делает кнопку переданной формы неактивной
    this._buttonSubmit.disabled = true;
  };
  _activateButton = () => {
    // функция, делает кнопку переданной формы активной
    this._buttonSubmit.disabled = false;
  };
  _hasValidForm = () => {
    //  проверяет валидность всех полей формы
    return this._inputList.every((input) => {
      return input.validity.valid;
    });
  };
  _hasValidInput = () => {
    //  проверяет валидность поля ввода
    if (!this._input.validity.valid) {
      this._addErrorInput();
      return false;
    } else {
      this._deleteErrorInput();
      return true;
    }
  };
  _hasValid = (evt) => {
    // Запускаем проверку на валидность формы, на которой произошло событие "input"
    this._input = evt.target;
    this._error = this._validatedForm.querySelector(`.${evt.target.id}-error`);
    this._messageError = evt.target.validationMessage;
    if (this._hasValidInput()) {
      if (this._hasValidForm()) {
        this._activateButton();
      } else {
        this._disableButton();
      }
    } else {
      this._disableButton();
    }
  };
}
