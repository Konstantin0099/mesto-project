
import {createElementSection} from '../components/card';
const profile = document.querySelector(".profile");
const elements = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_profile-info");
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const popupCardAdd = document.querySelector(".popup_card-add");
const newCardPopup = popupCardAdd.querySelector(".popup__container");

const namePopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_name"
);
const professionPopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_profession"
);
const inputSubmitItemProfileInfo =
  popupProfileInfo.querySelector(".input-container");
const inputSubmitItemElement = newCardPopup.querySelector(".input-container");

const openPopupProfileInfo = () => {
  namePopupProfileInfo.value = profile.querySelector(
    ".profile-info__name"
  ).textContent;
  professionPopupProfileInfo.value = profile.querySelector(
    ".profile-info__vocation"
  ).textContent;

console.log("openPopupProfileInfo(profile)", profile);
  openPopup(popupProfile, popupProfileInfo);
};
const openPopupAddCard = () => {
  newCardPopup.querySelector(".input-container__item_url").value = "";
  newCardPopup.querySelector(".input-container__item_nameMesto").value = "";
  openPopup(popupCardAdd, newCardPopup);
};

function openPopup(overlay, popup) {
  setPopupCloseEventListener(overlay, popup);
  popup.classList.add("popup_opened");
  overlay.classList.add("popup_opened");
}
function closePopup(overlay, popup) {
  overlay.classList.add("popup_closed");
  overlay.classList.remove("popup_opened");
  popup.classList.remove("popup_opened");
}
const keyDownEscape = (overlay, popup) => {
  const closed = (evt) => {
    if (evt.key === "Escape") {
      closePopup(overlay, popup);
      document.removeEventListener("keydown", closed);
    }
  };
  document.addEventListener("keydown", closed);
};
const clickOverlay = (overlay, popup) => {
  overlay.addEventListener("click", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target === popup.querySelector(".popup__click")
    ) {
      closePopup(overlay, popup);
    }
  });
};
function setPopupCloseEventListener(overlay, popup) {
  clickOverlay(overlay, popup);
  keyDownEscape(overlay, popup);
}
inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profile.querySelector(".profile-info__name").textContent =
    popupProfileInfo.querySelector(".input-container__item_name").value;
  profile.querySelector(".profile-info__vocation").textContent =
    popupProfileInfo.querySelector(".input-container__item_profession").value;
  closePopup(popupProfile, popupProfileInfo); ////////////////////////////// закрытие попапа
});
inputSubmitItemElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    link: newCardPopup.querySelector(".input-container__item_url").value,
    name: newCardPopup.querySelector(".input-container__item_nameMesto").value,
  };
  elements.prepend(createElementSection(newCard)); // добавляем карточку на страницу
  closePopup(popupCardAdd, newCardPopup); ////////////////////////////// закрытие попапа
  evt.target.reset(); // очистка формы
});
export { openPopupProfileInfo, openPopupAddCard, openPopup, profile, elements };
