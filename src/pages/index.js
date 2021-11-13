import "./index.css";
import { enableValidation } from "../components/validate";
import { getInitialProfile, getInitialCards, resOk } from "../components/api";
import { initialCards } from "../components/card";
import {
  openPopupProfileInfo,
  openPopupEditAvatar,
  openPopupAddCard,
  profile,
  addProfileInfo,
} from "../components/modal";

enableValidation({
  formSelector: ".input-container",
  inputSelector: ".input-container__item",
  submitButtonSelector: ".input-container__submit-item",
  inactiveButtonClass: "input-container__submit-item_disabled",
  inputErrorClass: "input-container__item_error",
  errorClass: "popup__error_visible",
});
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");
const profileAvatarClick = profile.querySelector(".profile__avatar-click");

profileAvatarClick.addEventListener("click", openPopupEditAvatar);
profileInfoEditButton.addEventListener("click", openPopupProfileInfo);
profileAddButton.addEventListener("click", openPopupAddCard);

Promise.all([getInitialCards(), getInitialProfile()])
  .then(([arrayInitialCards, InitialProfile]) => {
    addProfileInfo(InitialProfile);
    initialCards(arrayInitialCards);
  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });
