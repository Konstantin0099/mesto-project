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
window.userId = undefined;
const api = new Api(config);
let userId;

const profileInfo = new UserInfo(
  profileInfoName,
  profileInfoVocation,
  profileAvatar
);

/**
 * Функция создает и возвращает заполненный элемент карточки, готовый к вставке в DOM
 * @param data    - Данные, которыми будет наполняться карточка
 * @param userId  - ID текущего пользователя
 * @returns       -> HTML-Element
 */
function createCard(data, userId) {
  const cardElement = new Card(
    data,
    userId,
    function () {
      popupImage.open(this._card.link, this._card.name);
    },
    function (likeElement, card) {

      function countLikes(card, arrayLikes) {
        card.querySelector(".like__numbers").textContent = arrayLikes.length;
      }

      function checkLikes(likeElement) {
        return likeElement.classList.contains("like_click");
      }

      function toggleLikeCard(func, card, likeItem) {
        func(card.dataset.id)
          .then((res) => {
            countLikes(card, res.likes);
            likeItem.classList.toggle("like_click");
          })
          .catch((err) => {
            console.log("ОШИБКА_Лайка__", err);
          })
          .finally(() => {
          });
      }

      if (checkLikes(likeElement)) {
        toggleLikeCard(api.deleteLikeCard.bind(api), card, likeElement)
      } else {
        toggleLikeCard(api.likeCard.bind(api), card, likeElement)
      }
    },
    function () {
      popupCardDelete.open();
      popupCardDelete._form.dataset.deleteCardId = this._card._id;
    },
    "#elementsSection");

  return cardElement.generate();
}

const sectionCards = new Section(
  {
    items: {},

    renderer: function (data) {
      // let img = document.createElement('img');
      // img.src = card.link;
      // img.onload = () => {

      sectionCards.appendElement(createCard(data, userId))
      // };
      // img.onerror = () => {
      //   console.log("__такой картинки нет______", `${card.link}`);
      // };
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
  sectionCards.prependElement.bind(sectionCards)
);
popupCardAdd.setEventListeners(data => {
  sectionCards.prependElement(createCard(data, userId));
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
    userId = user._id;
    profileInfo.initUserInfo(user);
    profileInfo.initUserAvatar(user);
    sectionCards.items = cards;
    sectionCards.renderItems();
  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });

export {api, popupImage, popupCardDelete};
