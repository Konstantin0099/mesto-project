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

window.userId = undefined;
const API = new Api(config);

const profileInfo = new UserInfo(
  profileInfoName,
  profileInfoVocation,
  profileAvatar
);
// console.log("index_____");
const cardItem = new Card({}, "#elementsSection");
// console.log("index__cardItem =___", cardItem);
const sectionCards = new Section(
  {
    items: {},
    renderer: function (card) {
      cardItem.card = card;
      // console.log("renderer: function (cardItem) =___", cardItem);
      // console.log("renderer: function (cardItem.card) =___", cardItem.card);
      sectionCards.addItem(cardItem.generate());
    },
  },
  ".elements"
  );
  
  // console.log("index__sectionCards =___", sectionCards);

const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  API.editAvatarProfile.bind(API),
  profileInfo.initUserAvatar.bind(profileInfo)
);
popupUpdateAvatar.setEventListeners();

const popupProfile = new PopupWithForm(
  ".popup_profile-info",
  API.editDataProfile.bind(API),
  profileInfo.initUserInfo.bind(profileInfo)
);
popupProfile.setEventListeners();

const popupCardAdd = new PopupWithForm(
  ".popup_card-add",
  API.addNewCard.bind(API),
  sectionCards._renderer.bind(sectionCards)
  // sectionCards.addItem.bind(sectionCards)
); // необходимо изменить колбек вынести sectionCards в зону видимости


popupCardAdd.setEventListeners();

profileAvatarClick.addEventListener("click", popupUpdateAvatar.open);
profileInfoEditButton.addEventListener("click", popupProfile.open);
profileAddButton.addEventListener("click", popupCardAdd.open);

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

console.log();
