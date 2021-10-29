
import { enableValidation } from "../components/validate";
import { arrayCards } from "../components/initial-cards";
import { initialCards } from "../components/card";
import {
  openPopupProfileInfo,
  openPopupAddCard,
  profile,
} from "../components/modal";

enableValidation({
  formSelector: ".input-container",
  inputSelector: ".input-container__item",
  submitButtonSelector: ".input-container__submit-item",
  inactiveButtonClass: "input-container__submit-item_disabled",
  inputErrorClass: "input-container__item_error",
  errorClass: "popup__error_visible",
});

// const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");

profileInfoEditButton.addEventListener("click", openPopupProfileInfo);
profileAddButton.addEventListener("click", openPopupAddCard);
initialCards(arrayCards);

// export {profile}
