const dataValidation = {
  formSelector: ".input-container",
  inputSelector: ".input-container__item",
  submitButtonSelector: ".input-container__submit-item",
  inactiveButtonClass: "input-container__submit-item_disabled",
  inputErrorClass: "input-container__item_error",
  errorClass: "popup__error_visible",
}

const profileInfoName =".profile-info__name";
const profileInfoVocation = ".profile-info__vocation";
const profileAvatar = ".profile__avatar";

const elements = document.querySelector(".elements");

const userAvatar = document.querySelector('.profile__avatar');
const userName = document.querySelector('.profile-info__name');
const userProfession = document.querySelector('.profile-info__vocation');

const popupProfile = document.querySelector(".popup_profile-info");
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const namePopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_name"
);
const professionPopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_profession"
);

const popupCardDelete1 = document.querySelector(".popup_delete-card");

/// /////////////
const profileAvatarClick = document.querySelector('.profile__avatar-click');
const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

export {
  namePopupProfileInfo, professionPopupProfileInfo,
  dataValidation, userAvatar, userName, userProfession,
  elements, profileInfoName, profileInfoVocation, profileAvatar,
  profileAvatarClick, profileInfoEditButton, profileAddButton, popupCardDelete1
}

