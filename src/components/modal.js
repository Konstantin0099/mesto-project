import { createElementSection } from "../components/card";

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


const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
  if (
    evt.target === evt.currentTarget ||
    evt.target === popup.querySelector(".popup__click")
    ) {
      closePopup(popup);
    }
  });
});

const openPopupProfileInfo = () => {
  namePopupProfileInfo.value = profile.querySelector(
    ".profile-info__name"
  ).textContent;
  professionPopupProfileInfo.value = profile.querySelector(
    ".profile-info__vocation"
  ).textContent;
  openPopup(popupProfile);
};
const openPopupAddCard = () => {
  newCardPopup.querySelector(".input-container__item_url").value = "";
  newCardPopup.querySelector(".input-container__item_nameMesto").value = "";
  openPopup(popupCardAdd);
};

function openPopup(overlay) {
  overlay.classList.add("popup_opened");
  document.addEventListener("keydown", keyDownEscape);
}
const closePopup = (overlay) => {
  overlay.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyDownEscape); 
}
const keyDownEscape = (evt) => {
    if (evt.key === "Escape") {
  const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
    }
  };

inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profile.querySelector(".profile-info__name").textContent =
    popupProfileInfo.querySelector(".input-container__item_name").value;
  profile.querySelector(".profile-info__vocation").textContent =
    popupProfileInfo.querySelector(".input-container__item_profession").value;
  closePopup(popupProfile);
});
inputSubmitItemElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    link: newCardPopup.querySelector(".input-container__item_url").value,
    name: newCardPopup.querySelector(".input-container__item_nameMesto").value,
  };
  elements.prepend(createElementSection(newCard));
  closePopup(popupCardAdd); 
  evt.target.reset(); 
  popupCardAdd.querySelector(
    `.input-container__submit-item`).disabled = true;
});

export { openPopupProfileInfo, openPopupAddCard, openPopup, profile, elements};
