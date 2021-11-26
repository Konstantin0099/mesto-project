import {API} from "../pages";
import {popupImage} from "../pages";

export default class Card {
  // { name, link, likes, _id, owner }
  constructor({ name, link, likes, _id, owner }, selectorTemplateElement) {
    this._name = name;
    this._imageUrl = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id;
    this._selectorTemplateElement = selectorTemplateElement;
  }

  _createElement() {
    return document
      .querySelector(this._selectorTemplateElement)
      .content
      .querySelector('.element')
      .cloneNode(true);
  };

  _checkMyLikesInit() {
    return this._likes.some((card) => {
      return card._id === window.userId;
    });
  }

  _handleCardClick(){
    popupImage.open(this._imageUrl, this._name)
  };
  _setEventListeners() {
    this._element.addEventListener('click',
      this._clickCard
     //this._handleCardClick()    // При клике на карточку эта функция должна открывать попап с картинкой.
    );

  }

  _checkLikes(likeItem) {
    return likeItem.classList.contains("like_click");
  }

  _toggleLikeCard(func, card, likeItem) {
    func(card.id)
      .then((res) => {
        this._countLikes(card, res.likes);
        likeItem.classList.toggle("like_click");
      })
      .catch((err) => {
        console.log("ОШИБКА_Лайка__", err);
      })
      .finally(() => { });
  }

  _countLikes(card, arrayLikes) {
    card.querySelector(".like__numbers").textContent = arrayLikes.length;
  }

  _clickLike(likeItem, card) {
    if (this._checkLikes(likeItem)) {
      this._toggleLikeCard(API.deleteLikeCard.bind(API), card, likeItem);
    } else {
      this._toggleLikeCard(API.likeCard.bind(API), card, likeItem);
    }
  }

  _openPopupDeleteCard() {
    API.deleteCard(this._id)
      .then(res => {
        this._element.remove();
      });
  }

  _clickCard = (evt) => {
    const item = evt.target;
    const card = evt.currentTarget;
    if (item.classList.contains("like")) {
      this._clickLike(item, card);
    }
    if (item.classList.contains("trash")) {
      console.log("нажали удалить");
      this._openPopupDeleteCard(card);
    }
    if (item.classList.contains("element__img")) {
      console.log("нажали на картинку");
      this._handleCardClick();
    }
  };

  generate() {
    // console.log("+++++++this._nameMesto+++++", this._nameMesto);
    this._element = this._createElement();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._imageUrl;
    this._element.querySelector('.element__figcaption').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector(".like__numbers").textContent = this._likes.length;
    this._element.id = this._id;
    if (this._checkMyLikesInit()) {
      this._element.querySelector(".like").classList.add("like_click");
    }
    if (this._ownerId === window.userId) {
      this._element.querySelector(".trash").classList.add("trash_include");
    }
    this._element.addEventListener("click", this._clickCard);
    return this._element;
  }
}


///////////////////////////////






// import { openPopupDeleteCard, openPopup, elements, ownerId } from "./Popup";
// import { deleteCard, likeCard, deleteLikeCard, resOk } from "./Api";

// function checkMyCard(card) {
//   return card.owner._id === ownerId;
// }

// function clickImg(imgItem, card) {
//   imgPopup.src = imgItem.src;
//   imgPopup.alt = imgItem.alt;
//   popupFigcaption.textContent = imgItem.alt;
//   openPopup(popupPicture);

// }
//
//
// // function checkMyLikesInit(arrayLikes) {
// //   return arrayLikes.some((card) => {
// //     return card._id === ownerId;
// //   });
// // }
//
//
//
//
//
//
// function createElementSection(card) {
//
//   // const newCard = elementSectionTemplate
//   //   .querySelector(".element")
//   //   .cloneNode(true);
//   // const imgNewCard = newCard.querySelector(".element__img");
//   // imgNewCard.src = card.link;
//   // imgNewCard.alt = card.name;
//   // newCard.id = card._id;
//   // newCard.querySelector(".element__figcaption").textContent = card.name;
//   // countLikes(newCard, card.likes);
// //   if (checkMyLikesInit(card.likes)) {
// //     toggleClassLike(newCard.querySelector(".like"));
// //   }
// //   if (checkMyCard(card)) {
// //     newCard.querySelector(".trash").classList.add("trash_include");
// //   }
// //   newCard.addEventListener("click", clickCard);
//
// //   return newCard;
// // }
//
//
// export { createElementSection, initialCards };
