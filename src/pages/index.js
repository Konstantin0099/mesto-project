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
      popupImage.open(this.card.link, this.card.name);
    },
    function () {
      const card = this.element;
      const likeElement = card.querySelector('.like');
      const that = this;
      function toggleLikeCard(func, card, likeItem) {
        func(card.dataset.id)
          .then((res) => {
            that.countLikes(card, res.likes);
            likeItem.classList.toggle("like_click");
          })
          .catch((err) => {
            console.log("ОШИБКА_Лайка__", err);
          })
          .finally(() => {
          });
      }

      if (this.checkLikes(likeElement)) {
        toggleLikeCard(api.deleteLikeCard.bind(api), card, likeElement)
      } else {
        toggleLikeCard(api.likeCard.bind(api), card, likeElement)
      }
    },
    function () {
      popupCardDelete.open();
      popupCardDelete.form.dataset.deleteCardId = this.card._id;
    },
    "#elementsSection");

  return cardElement.generate();
}

const sectionCards = new Section(
  {
    items: {},
    renderer: function (data) {
      const img = document.createElement('img');
      img.src = data.link;
      img.onload = () => {
        sectionCards.appendElement(createCard(data, userId))
      };
      img.onerror = () => {
      };
    },
  },
  ".elements"
);

const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  (data) => {
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
  (data) => {
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
  (data) => {
    const callBack = (dataCard) => {
      sectionCards.prependElement(createCard(dataCard, userId));
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
  (cardId, popup) => {
    api.deleteCard(cardId)
      .then(() => {
        document.querySelector(`[data-id="${cardId}"]`).remove();
        popup.close();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popup.saveBtn.textContent = 'Да';
      });
  });
popupCardDelete.setEventListeners();

const popupImage = new PopupWithImage(".popup_picture");

popupImage.setEventListeners();

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

export {api};
