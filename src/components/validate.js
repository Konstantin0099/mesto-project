// export function enableValidation(dataValidation) {
//   const addErrorInput = (form) => {
//     form.form.classList.add(`${dataValidation.errorClass}`);
//     form.error.classList.add(`${dataValidation.inputErrorClass}`);
//     form.error.textContent = form.messageError;
//     form.buttonSubmit.classList.add(`${dataValidation.inactiveButtonClass}`);
//     disableButton(form);
//   };
//   const deleteErrorInput = (form) => {
//     form.error.classList.remove(`${dataValidation.inputErrorClass}`);
//     form.error.textContent = "";
//   };
//   const disableButton = (form) => {
//     form.buttonSubmit.disabled = true;
//   };
//   const activateButton = (form) => {
//     form.buttonSubmit.disabled = false;
//   };
//   const hasValidForm = (form) => {
//     const inputList = Array.from(
//       form.form.querySelectorAll(`${dataValidation.inputSelector}`)
//     );
//     return inputList.every((input) => {
//       return input.validity.valid;
//     });
//   };
//   const hasValidinput = (form) => {
//     if (!form.input.validity.valid) {
//       addErrorInput(form);
//       return false;
//     } else {
//       deleteErrorInput(form);
//       return true;
//     }
//   };
//   const hasValid = (evt) => {
//     const form = {
//       form: evt.currentTarget,
//       input: evt.target,
//       error: evt.currentTarget.querySelector(`.${evt.target.id}-error`),
//       messageError: evt.target.validationMessage,
//       buttonSubmit: evt.currentTarget.querySelector(
//         `${dataValidation.submitButtonSelector}`
//       ),
//     };
//     if (hasValidinput(form)) {
//       if (hasValidForm(form)) {
//         activateButton(form);
//       } else {
//         disableButton(form);
//       }
//     } else {
//       disableButton(form);
//     }
//   };
//   const formList = Array.from(document.forms);
//   formList.forEach((form) => {
//     form.querySelector(
//       `${dataValidation.submitButtonSelector}`
//     ).disabled = true;
//     form.addEventListener("input", hasValid);
//   });
// }
