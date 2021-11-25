export default class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open = () => {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  };

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget
        || evt.target === this._popup.querySelector(".popup__click")) {
        this.close(this._popup);
      }
    });
  }
}// конец class Popup



///////////////////////////////////////////////////////////////////////////////////////////
// import { createElementSection } from "./Card";

// import {
//   editDataProfile,
//   editAvatarProfile,
//   resOk,
//   addNewCard,
//   deleteCard,
//   checkUrl,
// } from "./Api";


// const popupList = Array.from(document.querySelectorAll(".popup"));
// popupList.forEach((popup) => {
  // popup.addEventListener("click", (evt) => {
  //   if (
  //     evt.target === evt.currentTarget ||
  //     evt.target === popup.querySelector(".popup__click")
  //   ) {
  //     closePopup(popup);
  //   }
  // });
// });

// const openPopupProfileInfo = () => {
//   namePopupProfileInfo.value = profileInfoName.textContent;
//   professionPopupProfileInfo.value = profileInfoVocation.textContent;
//   openPopup(popupProfile);
// };
// const openPopupAddCard = () => {
//   inputContainerItemUrl.value = "";
//   inputContainerItemNameMesto.value = "";
//   openPopup(popupCardAdd);
// };


// const openPopupEditAvatar = () => {
//   urlUpdateAvatar.value = "";
//   openPopup(popupUpdateAvatar);
// };

// const confirmDelete = () => {
//   buttonSavingData(popupCardDelete, " Удаление....");
//   deleteCard(cardDelete.id)
//     .then(() => {
//       cardDelete.closest(".element").remove();
//       closePopup(popupCardDelete);
//     })
//     .catch((err) => {
//       console.log("ОШИБКА___", err);
//     })
//     .finally(() => {
//       buttonConfirmDelete.removeEventListener("click", confirmDelete);
//       buttonSavingData(popupCardDelete, " Да ");
//     });
// };


// const openPopupDeleteCard = (card) => {
//   cardDelete = card;
//   openPopup(popupCardDelete);
//   buttonConfirmDelete.addEventListener("click", confirmDelete);
// };





// function openPopup(overlay) {
//   overlay.classList.add("popup_opened");
//   document.addEventListener("keydown", keyDownEscape);
// }
// const closePopup = (overlay) => {
//   overlay.classList.remove("popup_opened");
//   document.removeEventListener("keydown", keyDownEscape);
// };

// const keyDownEscape = (evt) => {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// };

// function addProfileInfo(profile) {
//   ownerId = profile._id;
//   profileInfoName.textContent = profile.name;
//   profileInfoVocation.textContent = profile.about;
//   profileAvatar.src = profile.avatar;
//   profileAvatar.alt = profile.name + ", " + profile.about;
// }
// function buttonSavingData(form, text) {
//   form.querySelector(".input-container__submit-item").textContent = text;
// }
// function addAvatar(avatar) {
//   profileAvatar.src = avatar.avatar;
// }

// inputSubmitUpdateAvatar.addEventListener("submit", function (evt) {
//   buttonSavingData(inputSubmitUpdateAvatar, "Сохранение....");
//   evt.preventDefault();
//   editAvatarProfile(urlUpdateAvatar.value)
//     .then((avatar) => {
//       addAvatar(avatar);
//       closePopup(popupUpdateAvatar);
//       inputSubmitButtonUpdateAvatar.disabled = true;
//     })
//     .catch((err) => {
//       console.log("ОШИБКА_UpdateAvatar__", err);
//     })
//     .finally(() => {
//       buttonSavingData(inputSubmitUpdateAvatar, "Сохранить");
//     });

//

// inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
//   buttonSavingData(inputSubmitItemProfileInfo, "Сохранение....");
//   evt.preventDefault();
//   editDataProfile(namePopupProfileInfo.value, professionPopupProfileInfo.value)
//     .then((profile) => {
//       addProfileInfo(profile);
//       closePopup(popupProfile);
//       inputSubmitButtonItemProfileInfo.disabled = true;
//     })
//     .catch((err) => {
//       console.log("ОШИБКА_ProfileInfo__", err);
//     })
//     .finally(() => {
//       buttonSavingData(inputSubmitItemProfileInfo, "Сохранить");
//     });
// });



// inputSubmitItemElement.addEventListener("submit", function (evt) {
//   debugger;
//   buttonSavingData(inputSubmitItemElement, "Сохранение....");
//   evt.preventDefault();
//   const newCard = {
//     link: inputContainerItemUrl.value,
//     name: inputContainerItemNameMesto.value,
//   };
//   let img = new Image();
//   img.onload = onLoadAddNewCard;
//   img.onerror = onErrorAddNewCard;
//   img.src = newCard.link;


//   function onLoadAddNewCard() {
//     addNewCard(newCard.name, newCard.link)
//       .then((card) => {
//         elements.prepend(createElementSection(card));
//         closePopup(popupCardAdd);
//         evt.target.reset();
//         inputContainerSubmitItem.disabled = true;
//       })
//       .catch((err) => {
//         console.log("ОШИБКА__ItemElement_", err);
//       })
//       .finally(() => {
//         buttonSavingData(inputSubmitItemElement, "Сохранить");
//       });
//   }

//

//   function onErrorAddNewCard() {
//     console.log("ОШИБКА__битая катрочка_");
//     inputContainerItemUrl.value = "неверный адрес картинки";
//     buttonSavingData(inputSubmitItemElement, "Сохранить");
//     inputContainerSubmitItem.disabled = true;


//   }
// });


// export {
//   openPopupProfileInfo,
//   openPopupAddCard,
//   openPopupDeleteCard,
//   openPopupEditAvatar,
//   openPopup,
//   addProfileInfo,
//   profile,
//   elements,
//   ownerId,
// };
