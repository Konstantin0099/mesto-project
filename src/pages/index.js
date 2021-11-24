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
} from "../components/Popup";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "506ae529-0bc2-4a43-a253-986c9dc5ffe6", //"506ae529-0bc2-4a43-a253-986c9dc5ffe6"
    "Content-Type": "application/json",
  },
};

///////////////////////

const api = new Api(Object1)
api.initialCards // получаем с сервера карточки

const card = new Card (Object2)
card.renderer

const Section = new Section (Object2)










/////////////////////////////////////////////////////////////////////////////
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

  function initialCards(arrayCards) {
    arrayCards.forEach((card) => {
  
  const elementSection = new Card(card, selector)
  
      elements.append(elementSection)
      // createElementSection(card, "append");
    });
  }
