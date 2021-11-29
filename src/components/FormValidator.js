
// Создание класса FormValidator
// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.

export default class FormValidator {
  //   constructor({ baseUrl, headers }, itemValidator) { // config = {baseUrl, headers }
  //     this.baseUrl = baseUrl;
  //     this.headers = headers;
  //   }
  //   // имеет публичный метод enableValidation, который включает валидацию формы.
  //   enableValidation(){
  //   }
  // }
  constructor(dataValidation){
    this.dataValidation = dataValidation;
}

addErrorInput = (form) => { // выполняется при не валидном инпуте 
// console.log("addErrorInput>form_____", form);
    form.form.classList.add(`${this.dataValidation.errorClass}`);// при ошибке стилизуеи инпуты
    form.error.classList.add(`${this.dataValidation.inputErrorClass}`);// при ошибке стилизуем поле Error
    form.error.textContent = form.messageError;// пишем причину невальдности
    form.buttonSubmit.classList.add(`${this.dataValidation.inactiveButtonClass}`); // стилизуем неактивную кнопку
    this.disableButton(form); // делаем кнпку неактивной
  };
deleteErrorInput = (form) => {  // убираем стили ошибки поля Error и отчищаем
    form.error.classList.remove(`${this.dataValidation.inputErrorClass}`);
    form.error.textContent = "";
  };
  
disableButton = (form) => { // функция, делает кнопку переданной формы неактивной
    form.buttonSubmit.disabled = true;
  };
activateButton = (form) => {// функция, делает кнопку переданной формы активной
  console.log("form____", form);
    form.buttonSubmit.disabled = false;
  };
  hasValidForm = (form) => { //  проверяет валидность всех полей формы
    const inputList = Array.from(
      form.form.querySelectorAll(`${this.dataValidation.inputSelector}`)
    );
    return inputList.every((input) => {
      return input.validity.valid;
    });
  };
  hasValidinput = (form) => {  //  проверяет валидность поля ввода
    if (!form.input.validity.valid) {
        this.addErrorInput(form);
      return false;
    } else {
        this.deleteErrorInput(form);
      return true;
    }
  };
  hasValid = (evt) => {  // проверяет на валидность форму, на которой произошло событие "input"
    const form = {
      form: evt.currentTarget,
      input: evt.target,
      error: evt.currentTarget.querySelector(`.${evt.target.id}-error`),
      messageError: evt.target.validationMessage,
      buttonSubmit: evt.currentTarget.querySelector(
        `${this.dataValidation.submitButtonSelector}`
      ),
    };
    if (this.hasValidinput(form)) {
      if (this.hasValidForm(form)) {
        this.activateButton(form);
      } else {
        this.disableButton(form);
      }
    } else {
        this.disableButton(form);
    }
  };
_setEventListenerInput = () =>
{// ищет все формы в документе и устаналиает обработчики на все формы на событие "input"
    const formList = Array.from(document.forms);
    formList.forEach((form) => {
    form.querySelector(
      `${this.dataValidation.submitButtonSelector}`
    ).disabled = true;
    form.addEventListener("input", this.hasValid);
  });

}



}
