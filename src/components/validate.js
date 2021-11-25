// enableValidation({
//     formSelector: ".input-container",
//     inputSelector: ".input-container__item",
//     submitButtonSelector: ".input-container__submit-item",
//     inactiveButtonClass: "input-container__submit-item_disabled",
//     inputErrorClass: "input-container__item_error",
//     errorClass: "popup__error_visible",
//   });

// export function enableValidation(dataValidation) {
// export default class EnableValidation {
// constructor(dataValidation){
//     this.dataValidation = dataValidation;
// }

// addErrorInput = (form) => {
// console.log("addErrorInput>form_____", form);
//     form.form.classList.add(`${this.dataValidation.errorClass}`);
//     form.error.classList.add(`${this.dataValidation.inputErrorClass}`);
//     form.error.textContent = form.messageError;
//     form.buttonSubmit.classList.add(`${this.dataValidation.inactiveButtonClass}`);
//     this.disableButton(form);
//   };
// deleteErrorInput = (form) => {
//     console.log("deleteErrorInput>form_____", form);
//     form.error.classList.remove(`${this.dataValidation.inputErrorClass}`);
//     form.error.textContent = "";
//   };
  
// disableButton = (form) => {
//     form.buttonSubmit.disabled = true;
//   };
// activateButton = (form) => {
//     form.buttonSubmit.disabled = false;
//   };
//   hasValidForm = (form) => {
//     console.log("hasValidForm>form_____", form);
//     const inputList = Array.from(
//       form.form.querySelectorAll(`${this.dataValidation.inputSelector}`)
//     );
//     return inputList.every((input) => {
//       return input.validity.valid;
//     });
//   };
//   hasValidinput = (form) => {
//     console.log("hasValidinput_____", form);
//     if (!form.input.validity.valid) {
//         this.addErrorInput(form);
//       return false;
//     } else {
//         this.deleteErrorInput(form);
//       return true;
//     }
//   };
//   hasValid = (evt) => {
//     console.log("hasValid>evt_____", evt);
//     const form = {
//       form: evt.currentTarget,
//       input: evt.target,
//       error: evt.currentTarget.querySelector(`.${evt.target.id}-error`),
//       messageError: evt.target.validationMessage,
//       buttonSubmit: evt.currentTarget.querySelector(
//         `${this.dataValidation.submitButtonSelector}`
//       ),
//     };
//     console.log("hasValid>form_____", form);
//     if (this.hasValidinput(form)) {
//       if (this.hasValidForm(form)) {
//         this.activateButton(form);
//       } else {
//         this.disableButton(form);
//       }
//     } else {
//         this.disableButton(form);
//     }
//   };
// _setEventListenerInput = () =>
// {
//     const formList = Array.from(document.forms);
//     formList.forEach((form) => {
//       console.log("_setEventListenerInput()_____", form);
//       console.log("_finish_____", this.dataValidation.submitButtonSelector);
//     form.querySelector(
//       `${this.dataValidation.submitButtonSelector}`
//     ).disabled = true;
//     form.addEventListener("input", this.hasValid);
//   });

// }



// }
