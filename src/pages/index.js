import "./index.css";

import config from "../utils/config";
import {processResponseProfileInfo} from "../utils/utils";
import {
  namePopupProfileInfo,
  professionPopupProfileInfo,
  profileInfoName,
  profileInfoVocation,
  profileAvatar,
  dataValidation,
  profileAvatarClick,
  profileInfoEditButton,
  profileAddButton,
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
import PopupConfirm from "../components/PopupConfirm";

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
      popupImage.open(data.link, data.name);
    },
    function (toggleLikeFunction) {
      function toggleLikeCard(func) {
        func(data._id)
          .then((res) => {
            toggleLikeFunction(res);
          })
          .catch((err) => {
            console.log("ОШИБКА_Лайка_err_", err);
          })
      }
      if (cardElement.checkLikes()) {
        toggleLikeCard(api.deleteLikeCard.bind(api))
      } else {
        toggleLikeCard(api.likeCard.bind(api))
      }
    },
    function () {
      popupCardDelete.open(data._id);

    },
    "#elementsSection");
  return cardElement.generate();
}

const sectionCards = new Section(
  {
    items: {},
    renderer: function (data) {
      return createCard(data, userId)
    }
  },
  ".elements"
);


const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  data => {
    const callBack = (userInfo) => {
      profileInfo.setUserInfo(userInfo);
    }
    processResponseProfileInfo(api.editAvatarProfile(data), callBack, popupUpdateAvatar)
  }
);
popupUpdateAvatar.setEventListeners();
/////////////////AvatarValidator
const popupUpdateAvatarValidator = new FormValidator(dataValidation, popupUpdateAvatar.form);
popupUpdateAvatarValidator.enableValidation();



const popupProfile = new PopupWithForm(
  ".popup_profile-info",
  data => {
    const callBack = (userInfo) => {
      profileInfo.setUserInfo(userInfo);
    }
    processResponseProfileInfo(api.editDataProfile(data), callBack, popupProfile)
  }
);
popupProfile.setEventListeners();
//////////ProfileValidator
const popupProfileValidator = new FormValidator(dataValidation, popupProfile.form);
popupProfileValidator.enableValidation();



const popupCardAdd = new PopupWithForm(
  ".popup_card-add",
  data => {
    const callBack = (dataCard) => {
      sectionCards.addItem(createCard(dataCard, userId));
    }
    processResponseProfileInfo(api.addNewCard(data), callBack, popupCardAdd)
  }
);
popupCardAdd.setEventListeners();
///////////CardAddValidator
const popupCardAddValidator = new FormValidator(dataValidation, popupCardAdd.form);
popupCardAddValidator.enableValidation();



const popupCardDelete = new PopupConfirm(
  ".popup_delete-card",
  cardId => {
    api.deleteCard(cardId)
      .then(() => {
        document.querySelector(`[data-id="${cardId}"]`).remove();
        popupCardDelete.close();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupCardDelete.renderLoading('Да');
      });
  });
popupCardDelete.setEventListeners();



const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();



profileAvatarClick.addEventListener("click", () => {
  popupUpdateAvatarValidator.toggleButtonState();
  popupUpdateAvatar.open();
});

profileInfoEditButton.addEventListener("click", () => {
  namePopupProfileInfo.value = userName.textContent;
  professionPopupProfileInfo.value = userProfession.textContent;
  popupProfileValidator.toggleButtonState();
  popupProfile.open();
});

profileAddButton.addEventListener("click", () => {
  popupCardAddValidator.toggleButtonState();
  popupCardAdd.open();
});





Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileInfo.setUserInfo(user);
    sectionCards.items = cards;
    sectionCards.renderItems();
  })
  .catch((err) => {
    console.log("ошибка---InitialProfilePromiseAll----", err);
  });
