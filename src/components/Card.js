import { API } from "../pages";
import { popupImage } from "../pages";
import { popupCardDelete } from "../pages";

export default class Card {
  constructor(card, selectorTemplateElement) {
    this.card = card;
    this._selectorTemplateElement = selectorTemplateElement;
  }

  _createElement() {
    return document
      .querySelector(this._selectorTemplateElement)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _checkMyLikesInit() {
    return this.card.likes.some((card) => {
      return card._id === window.userId;
    });
  }

  _handleCardClick() {
    popupImage.open(this.card.link, this.card.name);
  }

  _setEventListeners() {
    this._element.addEventListener(
      "click",
      this._clickCard

      // При клике на карточку эта функция должна открывать попап с картинкой.
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
      .finally(() => {});
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

  _openPopupDeleteCard(card) {
    popupCardDelete.open();
    popupCardDelete._form.dataset.deleteCardId = this.card._id;
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
    const img = new Image();
    const item = (selector) => {
      return this._element.querySelector(selector);
    };
    this._element = this._createElement();
    item(".element__img").src = this.card.link;
    this._setEventListeners();
    item(".element__figcaption").textContent = this.card.name;
    item(".element__img").alt = this.card.name;
    item(".like__numbers").textContent = this.card.likes.length;
    this._element.dataset.id = this.card._id;
    if (this._checkMyLikesInit()) {
      item(".like").classList.add("like_click");
    }
    if (this.card.owner._id === window.userId) {
      item(".trash").classList.add("trash_include");
    }
    item("click", this._clickCard);
    return this._element;
  }
}
