import './index.css';
import { enableValidation } from "../components/validate";
import { getInitialProfile, getInitialCards, resOk} from "../components/api";
import { initialCards } from "../components/card";
import {
  openPopupProfileInfo,
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
profileInfoEditButton.addEventListener("click", openPopupProfileInfo);
profileAddButton.addEventListener("click", openPopupAddCard);
resOk(getInitialCards())
  .then((arrayCards) => {
    initialCards(arrayCards);
  })
  .catch((err) => { console.log("ошибка---InitialCards----", err);
  });

resOk(getInitialProfile())
  .then((profile) => {
    addProfileInfo(profile)
  })
  .catch((err) => { console.log("ошибка---InitialProfile----", err);
  }); 