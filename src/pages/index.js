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
import {logPlugin} from "@babel/preset-env/lib/debug";

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
    function (data) {
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
      const img = document.createElement('img');
      img.src = data.link;
      img.onload = () => {
        sectionCards.appendElement(createCard(data, userId))
      };
      img.onerror = () => {
        console.log("__такой картинки нет______", `${data.name}`, `${data.link}`);
      };
    },
  },
  ".elements"
);

const processResponseProfileInfo = (res, callBack, popup) => {
  return res
    .then(userInfo => {
      callBack(userInfo);
      popup.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popup._saveBtn.textContent = 'Сохранить';
    });
}

const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  (data, popup) => {
    const callBack = (userInfo) => {
      profileInfo.setUserInfo(userInfo);
    }
    processResponseProfileInfo(api.editAvatarProfile(data), callBack, popup)
  }
);
popupUpdateAvatar.setEventListeners();
/////////////////AvatarValidator
const popupUpdateAvatarValidator = new FormValidator(dataValidation, popupUpdateAvatar._form);
popupUpdateAvatarValidator.enableValidation();

const popupProfile = new PopupWithForm(
  ".popup_profile-info",
  (data, popup) => {
    const callBack = (userInfo) => {
      profileInfo.setUserInfo(userInfo);
    }
    processResponseProfileInfo(api.editDataProfile(data), callBack, popup)
  }
);
popupProfile.setEventListeners();
//////////ProfileValidator
const popupProfileValidator = new FormValidator(dataValidation, popupProfile._form);
popupProfileValidator.enableValidation();

const popupCardAdd = new PopupWithForm(
  ".popup_card-add",
  (data, popup) => {
    const callBack = (dataCard) => {
      sectionCards.prependElement(createCard(dataCard, userId));
    }
    processResponseProfileInfo(api.addNewCard(data), callBack, popup)
  }
);
popupCardAdd.setEventListeners();
///////////CardAddValidator
const popupCardAddValidator = new FormValidator(dataValidation, popupCardAdd._form);
popupCardAddValidator.enableValidation();

const popupCardDelete = new PopupWithForm(
  ".popup_delete-card",
  (cardId, popup) => {
    api.deleteCard(cardId)
      .then(() => {
        document.querySelector(`[data-id="${cardId}"]`).remove();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popup.close();
        popup._saveBtn.textContent = 'Да';
      });
  });
popupCardDelete.setEventListenersRemove();

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
