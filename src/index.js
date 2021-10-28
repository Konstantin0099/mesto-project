import './styles/index.css'; 
const enableValidation = {
  formSelector: ".input-container",
  inputSelector: ".input-container__item",
  submitButtonSelector: ".input-container__submit-item",
  inactiveButtonClass: "input-container__submit-item_disabled",
  inputErrorClass: "input-container__item_error",
  errorClass: "popup__error_visible",
};
const addErrorInput = (form) => {
  form.form.classList.add(`${enableValidation.errorClass}`);
  form.error.classList.add(`${enableValidation.inputErrorClass}`);
  form.error.textContent = form.messageError;
  form.buttonSubmit.classList.add(`${enableValidation.inactiveButtonClass}`);
  disableButton;
};
const deleteErrorInput = (form) => {
  form.error.classList.remove(`${enableValidation.inputErrorClass}`);
  form.error.textContent = "";
};
const disableButton = (form) => {
  form.buttonSubmit.disabled = true;
};
const activateButton = (form) => {
  form.buttonSubmit.disabled = false;
};
const hasValidForm = (form) => {
  const inputList = Array.from(form.form.querySelectorAll(`${enableValidation.inputSelector}`));
  return inputList.every((input) => {
    return input.validity.valid;
  });
};
const hasValidinput = (form) => {
  if (!form.input.validity.valid) {
    addErrorInput(form);
    return false;
  } else {
    deleteErrorInput(form);
    return true;
  }
};

const hasValid = (evt) => {
  const form = {
    form: evt.currentTarget,
    input: evt.target,
    error: evt.currentTarget.querySelector(`.${evt.target.id}-error`),
    messageError: evt.target.validationMessage,
    buttonSubmit: evt.currentTarget.querySelector(
      `.input-container__submit-item`
    ),
  };
  if (hasValidinput(form)) {
    if (hasValidForm(form)) {
      activateButton(form);
    } else {
      console.log("if (hasValidForm(form)) { disableButton; }");
      disableButton;
    }
  }
  else {
      console.log("if (hasValidinput(form)) { disableButton; }");
    disableButton(form);
  }
};
const formList = Array.from(document.forms);
formList.forEach((form) => {
  form.querySelector(
    `.input-container__submit-item`).disabled = true;
  form.addEventListener("input", hasValid);
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
});
