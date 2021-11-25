
const profile = document.querySelector(".profile");
const profileInfoName = profile.querySelector(".profile-info__name");
const profileInfoVocation = profile.querySelector(".profile-info__vocation");
const profileAvatar = profile.querySelector(".profile__avatar");

const elements = document.querySelector(".elements");

const popupUpdateAvatar = document.querySelector(".popup_update-avatar");
const inputSubmitUpdateAvatar =
  popupUpdateAvatar.querySelector(".input-container");
const urlUpdateAvatar = popupUpdateAvatar.querySelector(
  ".input-container__item_avatar"
);
const inputSubmitButtonUpdateAvatar = popupUpdateAvatar.querySelector(
  ".input-container__submit-item"
);

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
const inputSubmitButtonItemProfileInfo = popupProfileInfo.querySelector(
  ".input-container__submit-item"
);

const popupCardAdd = document.querySelector(".popup_card-add");
const inputContainerSubmitItem = popupCardAdd.querySelector(
  `.input-container__submit-item`
);
const popupCardDelete = document.querySelector(".popup_delete-card");
const buttonConfirmDelete = popupCardDelete.querySelector(
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

const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");
const imgPopup = popupImg.querySelector(".img-popup");
const popupFigcaption = popupImg.querySelector(".popup-figcaption");
const elementSectionTemplate =
  document.querySelector("#elementsSection").content;

  export{
    elements,
    ownerId
  }

/// /////////////
const profileAvatarClick = document.querySelector('.profile__avatar-click');
const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

export {
  profile, profileInfoName, profileInfoVocation, profileAvatar,
  profileAvatarClick, profileInfoEditButton, profileAddButton
}

