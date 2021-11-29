import "./index.css";

import config from "../utils/config";
import {
  popupCardDelete1,
  profileInfoName,
  profileInfoVocation,
  profileAvatar,
  dataValidation,
  profileAvatarClick,
  profileInfoEditButton,
  profileAddButton,
  userAvatar, userName, userProfession
} from "../utils/constants";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

window.userId = undefined;
const API = new Api(config);

const valid = new FormValidator(dataValidation);
valid._setEventListenerInput();

const profileInfo = new UserInfo(
  profileInfoName,
  profileInfoVocation,
  profileAvatar
);

let sectionCards = new Section(
  {
    items: {},
    renderer: function (card) {
      sectionCards.addItem(new Card(card, "#elementsSection").generate());
    },
  },
  ".elements"
);

const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  API.editAvatarProfile.bind(API),
  profileInfo.initUserAvatar.bind(profileInfo)
);
popupUpdateAvatar.setEventListeners(
  data => {
    userAvatar.src = data.avatar;
  }
);

const popupProfile = new PopupWithForm(// попап изменения ФИО
  ".popup_profile-info",
  API.editDataProfile.bind(API),
  profileInfo.initUserInfo.bind(profileInfo)
);
popupProfile.setEventListeners(
  data => {
    userName.textContent = data.name;
    userProfession.textContent = data.about;
  }
);

const popupCardAdd = new PopupWithForm(// попап добавдения карточки
  ".popup_card-add",
  API.addNewCard.bind(API),
  sectionCards.addItem.bind(sectionCards)
); 
popupCardAdd.setEventListeners(
  data => {
    sectionCards.addCard(new Card(data, "#elementsSection").generate());
  }
);

const popupImage = new PopupWithImage('.popup_picture');
popupImage.setEventListeners();

// debugger;
const popupCardDelete = new PopupWithForm(// попап удаления карточки
  ".popup_delete-card", '', ''
);
popupCardDelete.setEventListenersRemove();

profileAvatarClick.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

profileInfoEditButton.addEventListener("click", () => {
  document.querySelector('.input-container__item_name').value = userName.textContent;
  document.querySelector('.input-container__item_profession').value = userProfession.textContent;
  popupProfile.open();
});

profileAddButton.addEventListener("click", () => {
  popupCardAdd.open();
});

Promise.all([API.getInitialProfile(), API.getInitialCards()])
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


export {API, popupImage, popupCardDelete}