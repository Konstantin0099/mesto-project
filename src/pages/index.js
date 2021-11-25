import "./index.css";

import config from "../components/config";
import {
  profileInfoName, profileInfoVocation, profileAvatar,
  dataValidation,
  profileAvatarClick, profileInfoEditButton, profileAddButton} from "../utils/constants";
import {addProfileInfo} from "../utils/utils";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";

window.userId = undefined;
const API = new Api(config);

const popupUpdateAvatar = new PopupWithForm(".popup_update-avatar");
popupUpdateAvatar.setEventListeners();

const popupProfile = new PopupWithForm(".popup_profile-info", API.editDataProfile);
popupProfile.setEventListeners();


const popupCardAdd = new PopupWithForm(".popup_card-add");



popupCardAdd.setEventListeners();

profileAvatarClick.addEventListener('click', popupUpdateAvatar.open);
profileInfoEditButton.addEventListener('click', popupProfile.open);
profileAddButton.addEventListener('click', popupCardAdd.open);


Promise.all([API.getInitialProfile(), API.getInitialCards()])
  .then(([user, cards]) => {
    window.userId = user._id;
    // addProfileInfo(profileInfo);
const profileInfo = new UserInfo(profileInfoName, profileInfoVocation, profileAvatar);
profileInfo.initUserInfo(user);
    const sectionCards = new Section({
      items: cards, renderer: function (card) {
        sectionCards.addItem(new Card(card, '#elementsSection').generate());
      }
    }, '.elements');

    sectionCards.renderItems();

  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });



  const valid = new  FormValidator(dataValidation)
  valid._setEventListenerInput();


  console.log()


