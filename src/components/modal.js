import { createElementSection } from "../components/card";

const profile = document.querySelector(".profile");
const profileInfoName = profile.querySelector(".profile-info__name");
const profileInfoVocation = profile.querySelector(".profile-info__vocation");
const elements = document.querySelector(".elements");
const popupProfile = document.querySelector(".popup_profile-info");
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const namePopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_name"
);
const professionPopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_profession"
);
const inputSubmitItemProfileInfo =
  popupProfileInfo.querySelector(".input-container");
const popupCardAdd = document.querySelector(".popup_card-add");
const inputContainerSubmitItem = popupCardAdd.querySelector(
  `.input-container__submit-item`
);
const newCardPopup = popupCardAdd.querySelector(".popup__container");
const inputSubmitItemElement = newCardPopup.querySelector(".input-container");
const inputContainerItemNameMesto = newCardPopup.querySelector(
  ".input-container__item_nameMesto"
);
const inputContainerItemUrl = newCardPopup.querySelector(
  ".input-container__item_url"
);
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
  namePopupProfileInfo.value = profileInfoName.textContent;
  professionPopupProfileInfo.value = profileInfoVocation.textContent;
  openPopup(popupProfile);
};
const openPopupAddCard = () => {
  inputContainerItemUrl.value = "";
  inputContainerItemNameMesto.value = "";
  openPopup(popupCardAdd);
};
function openPopup(overlay) {
  overlay.classList.add("popup_opened");
  document.addEventListener("keydown", keyDownEscape);
}
const closePopup = (overlay) => {
  overlay.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyDownEscape);
};
const keyDownEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = namePopupProfileInfo.value;
  profileInfoVocation.textContent = professionPopupProfileInfo.value;
  closePopup(popupProfile);
});
inputSubmitItemElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    link: inputContainerItemUrl.value,
    name: inputContainerItemNameMesto.value,
  };
  elements.prepend(createElementSection(newCard));
  closePopup(popupCardAdd);
  evt.target.reset();
  inputContainerSubmitItem.disabled = true;
});

export { openPopupProfileInfo, openPopupAddCard, openPopup, profile, elements };
