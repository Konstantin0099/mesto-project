import "./index.css";
// import { enableValidation } from "../components/validate";
// import { getInitialProfile, getInitialCards, resOk } from "../components/Api";
import Api from "../components/Api";
import Card from "../components/Card";
import Section from "../components/Section";
import {
  openPopupProfileInfo,
  openPopupEditAvatar,
  openPopupAddCard,
  profile,
  addProfileInfo,
  elements
}  from "../utils/constants";
// import {

// } from "../components/Popup";

// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
//   headers: {
//     authorization: "506ae529-0bc2-4a43-a253-986c9dc5ffe6", //"506ae529-0bc2-4a43-a253-986c9dc5ffe6"
//     "Content-Type": "application/json",
//   },
// };

/////////////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: '506ae529-0bc2-4a43-a253-986c9dc5ffe6',
    'Content-Type': 'application/json'
  }
}); 

//получаем с сервера карточки
const cardList = new Section({
    data: {},
    renderer: (item) => {
      const card = new Card(item, "#elementsSection");
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    }
  }, ".elements");

  api.getInitialCards().then((dataCards) => {
  console.log("api.getInitilCards()________ ", dataCards);
  cardList._items = dataCards;
  cardList.renderItems();
});



// const cardList = new Section({
//   data: {},
//   renderer: (item) => {
//     const card = new Card(item, '.element');
//     const cardElement = card.generate();
//     cardList.addItem(cardElement);
//   }
// }, elements);

//cardList.renderItems();  // запустить в конце файла


// const card = new Card (dataCards, "#elementsSection");
// card.renderer();




/////////////////////////////////////////////////////////////////////////////
// enableValidation({
//   formSelector: ".input-container",
//   inputSelector: ".input-container__item",
//   submitButtonSelector: ".input-container__submit-item",
//   inactiveButtonClass: "input-container__submit-item_disabled",
//   inputErrorClass: "input-container__item_error",
//   errorClass: "popup__error_visible",
// });
// const profileInfoEditButton = profile.querySelector(
//   ".profile-info__edit-button"
// );
// const profileAddButton = profile.querySelector(".profile__add-button");
// const profileAvatarClick = profile.querySelector(".profile__avatar-click");

// profileAvatarClick.addEventListener("click", openPopupEditAvatar);
// profileInfoEditButton.addEventListener("click", openPopupProfileInfo);
// profileAddButton.addEventListener("click", openPopupAddCard);

// Promise.all([getInitialCards(), getInitialProfile()])
//   .then(([arrayInitialCards, InitialProfile]) => {
//     addProfileInfo(InitialProfile);
//     initialCards(arrayInitialCards);
//   })
//   .catch((err) => {
//     console.log("ошибка---InitialProfilePromiseAll----", err);
//   });

//   function initialCards(arrayCards) {
//     arrayCards.forEach((card) => {
  
//   const elementSection = new Card(card, selector)
  
//       elements.append(elementSection)
//       // createElementSection(card, "append");
//     });
//   }
