import {API} from "../pages";
import {popupImage} from "../pages";
import {popupCardDelete} from "../pages";

export default class Card {
  // { name = "1", link  = "1", likes  = [1] , _id  = "1" , owner  = "1"}
  constructor(card, selectorTemplateElement) {
    this.card = card;
    // this.name = card.name;
    // this.imageUrl = card.link;
    // this.likes = this.card.likes;
    // this.id = card._id;
    // this.ownerId = card.owner;
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
    return this.card.likes.some((card) => {
      return card._id === window.userId;
    });
  }

  _handleCardClick() {
    popupImage.open(this.card.link, this.card.name)
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
    func(card.dataset.id)
      .then((res) => {
        this._countLikes(card, res.likes);
        likeItem.classList.toggle("like_click");
      })
      .catch((err) => {
        console.log("ОШИБКА_Лайка__", err);
      })
      .finally(() => {
      });
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

  _openPopupDeleteCard(card) {
    console.log("____________popupCardDelete");
    popupCardDelete.open();
    popupCardDelete._form.dataset.deleteCardId = this.card._id;
    
    // API.deleteCard(this.card._id)
    //   .then(res => {
    //     this._element.remove();
    //   });

      
  }

  _clickCard = (evt) => {
    const item = evt.target;
    const card = evt.currentTarget;
    if (item.classList.contains("like")) {
      this._clickLike(item, card);
    }
    if (item.classList.contains("trash")) {
      this._openPopupDeleteCard(card);
    }
    if (item.classList.contains("element__img")) {
      this._handleCardClick();
    }
  };

  generate() {

// console.log("ссылка на картинку__", this.card.link);
// console.log("ссылка на картинку__", this.card.link);

    this._element = this._createElement();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this.card.link;
    this._element.querySelector('.element__figcaption').textContent = this.card.name;
    this._element.querySelector('.element__img').alt = this.card.name;
    this._element.querySelector(".like__numbers").textContent = this.card.likes.length;
    this._element.dataset.id = this.card._id;
    if (this._checkMyLikesInit()) {
      this._element.querySelector(".like").classList.add("like_click");
    }
    if (this.card.owner._id === window.userId) {
      this._element.querySelector(".trash").classList.add("trash_include");
    }
    this._element.addEventListener("click", this._clickCard);
    return this._element;
  }
}