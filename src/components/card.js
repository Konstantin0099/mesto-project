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

  // _handleOpenPopup(){
  //   popupImage.src = this._image;
  //   popupElement.classList.add("popup_is-opened");
  // }

  // _handleClosePopup(){
  //   popupImage.src = "";
  //   popupElement.classList.remove("popup_is-opened");
  // }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      // this._handleOpenPopup()
    });
    // popupCloseButton.addEventListener('click', () => {
    //   // this._handleClosePopup()
    // });
  }

  _checkLikes(likeItem) {
    return likeItem.classList.contains("like_click");
  }

  _toggleLikeCard(func, card) {
    func(card.id)
      .then((res) => {
        this._countLikes(card, res.likes);
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
      this._toggleLikeCard(deleteLikeCard, card);
    } else {
      this._toggleLikeCard(likeCard, card);
    }
    this._toggleClassLike(likeItem);
  }

  _toggleClassLike(likeItem) {
    likeItem.classList.toggle("like_click");
  }
  
  _clickCard = (evt) => {
    const item = evt.target;
    const card = evt.currentTarget;
    if (item.classList.contains("like")) {
      this._clickLike(item, card);
    }
    if (item.classList.contains("trash")) {
      // this._openPopupDeleteCard(card);
    }
    if (item.classList.contains("element__img")) {
      // this._clickImg(item, card);
    }
  };

  generate() {
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

// import { openPopupDeleteCard, openPopup, elements, ownerId } from "./Popup";
// import { deleteCard, likeCard, deleteLikeCard, resOk } from "./Api";
// const popupPicture = document.querySelector(".popup_picture");
// const popupImg = popupPicture.querySelector(".popup-img");
// const imgPopup = popupImg.querySelector(".img-popup");
// const popupFigcaption = popupImg.querySelector(".popup-figcaption");
// const elementSectionTemplate =
//   document.querySelector("#elementsSection").content;
//
//
//
//
// // function checkMyCard(card) {
// //   return card.owner._id === ownerId;
// // }
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
