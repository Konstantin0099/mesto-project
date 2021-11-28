import "./index.css";

import config from "../components/config";
import {
  profileInfoName,
  profileInfoVocation,
  profileAvatar,
  dataValidation,
  profileAvatarClick,
  profileInfoEditButton,
  profileAddButton,
} from "../utils/constants";
import { addProfileInfo } from "../utils/utils";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

window.userId = undefined;
const API = new Api(config);

const profileInfo = new UserInfo(
  profileInfoName,
  profileInfoVocation,
  profileAvatar
);

// console.log("index_____");
const cardItem = new Card({}, "#elementsSection");// console.log("index__cardItem =___", cardItem);
const sectionCards = new Section(
  {
    items: {},
    renderer: function (card) {
      cardItem.card = card;// console.log("renderer: function (cardItem) =___", cardItem);
      sectionCards.addItem(cardItem.generate()); // console.log("renderer: function (cardItem.card) =___", cardItem.card);
    },
  },
  ".elements"
  );
  
const popupUpdateAvatar = new PopupWithForm(// попап изменения АВАВТАРА
  ".popup_update-avatar",
  API.editAvatarProfile.bind(API),
  profileInfo.initUserAvatar.bind(profileInfo)
);
popupUpdateAvatar.setEventListeners();

const popupProfile = new PopupWithForm(// попап изменения ФИО
  ".popup_profile-info",
  API.editDataProfile.bind(API),
  profileInfo.initUserInfo.bind(profileInfo)
);
popupProfile.setEventListeners();

const popupCardAdd = new PopupWithForm(// попап добавдения карточки
  ".popup_card-add",
  API.addNewCard.bind(API),
  sectionCards._renderer.bind(sectionCards)
  // sectionCards.addItem.bind(sectionCards)
); // необходимо изменить колбек вынести sectionCards в зону видимости
popupCardAdd.setEventListeners();

const popupImage = new PopupWithImage('.popup_picture');
popupImage.setEventListeners();

profileAvatarClick.addEventListener("click", () => {
  popupUpdateAvatar.open();
  console.log(this)
});
profileInfoEditButton.addEventListener("click", () => {
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
    // console.log("PromiseAll-user---", user);
    console.log("PromiseAll-cards---", cards);
    sectionCards.items = cards;
    // const sectionCards = new Section(
    //   {
    //     items: cards,
    //     renderer: function (card) {
    //       sectionCards.addItem(new Card(card, "#elementsSection").generate());
    //     },
    //   },
    //   ".elements"
    // );

    sectionCards.renderItems();
  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });

const valid = new FormValidator(dataValidation);
valid._setEventListenerInput();

export { API, popupImage }