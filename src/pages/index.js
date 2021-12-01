import "./index.css";

import config from "../utils/config";
import {
  namePopupProfileInfo,
  professionPopupProfileInfo,
  popupCardDelete1,
  profileInfoName,
  profileInfoVocation,
  profileAvatar,
  dataValidation,
  profileAvatarClick,
  profileInfoEditButton,
  profileAddButton,
  userAvatar,
  userName,
  userProfession,
} from "../utils/constants";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";

import FormValidator from "../components/FormValidator";


import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";

import PopupWithImage from "../components/PopupWithImage";
// debugger;
window.userId = undefined;
const api = new Api(config);



const profileInfo = new UserInfo(
  profileInfoName,
  profileInfoVocation,
  profileAvatar
);

const sectionCards = new Section(
  {
    items: {},
    renderer: function (card) {
      let img = document.createElement('img');
      img.src = card.link;
      img.onload = () => {
      sectionCards.addItem(new Card(card, "#elementsSection").generate());
      };
      img.onerror = () => {
        console.log("__такой картинки нет______", `${card.link}`);
      };
    },
  },
  ".elements"
);



const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  api.editAvatarProfile.bind(api),
  profileInfo.initUserAvatar.bind(profileInfo)
);

popupUpdateAvatar.setEventListeners((data) => {
  userAvatar.src = data.avatar;
});


const popupUpdateAvatarValidator = new FormValidator(dataValidation, popupUpdateAvatar);
popupUpdateAvatarValidator.enableValidation("input-container-avatar");


// const popupUpdateAvatarValidator = new FormValidator(dataValidation, popupUpdateAvatar);
// popupUpdateAvatarValidator.enableValidation("input-container-avatar");

// const popupUpdateAvatarValidator = new FormValidator(dataValidation, popupUpdateAvatar);
// popupUpdateAvatarValidator.enableValidation("input-container-avatar");





const popupProfile = new PopupWithForm( // попап изменения ФИО
  ".popup_profile-info",
  api.editDataProfile.bind(api),
  profileInfo.initUserInfo.bind(profileInfo)
);
popupProfile.setEventListeners((data) => {
  userName.textContent = data.name;
  userProfession.textContent = data.about;
});

const popupProfileValidator = new FormValidator(dataValidation, popupProfile);
popupProfileValidator.enableValidation("input-profile-info");


const popupCardAdd = new PopupWithForm( // попап добавдения карточки
  ".popup_card-add",
  api.addNewCard.bind(api),
  sectionCards.addItem.bind(sectionCards)
);
popupCardAdd.setEventListeners((data) => {
  sectionCards.addCard(new Card(data, "#elementsSection").generate());
});

const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();

// debugger;

const popupCardDelete = new PopupWithForm(".popup_delete-card", "", ""); // попап удаления карточки
popupCardDelete.setEventListenersRemove();

profileAvatarClick.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

profileInfoEditButton.addEventListener("click", () => {
  namePopupProfileInfo.value = userName.textContent;
  professionPopupProfileInfo.value = userProfession.textContent;
  popupProfile.open();
});

profileAddButton.addEventListener("click", () => {
  popupCardAdd.open();
});
console.log("__Promise.all____");
Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([user, cards]) => {
    window.userId = user._id;
    profileInfo.initUserInfo(user);
    profileInfo.initUserAvatar(user);
    sectionCards.items = cards;
    sectionCards.renderItems();
  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });
  // console.log("__Promise.all____");
export { api, popupImage, popupCardDelete };
