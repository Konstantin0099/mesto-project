export default class Card {
  constructor(
    card,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
    selectorTemplateElement
  ) {
    this._card = card;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._selectorTemplateElement = selectorTemplateElement;
  }

  _createElement() {
    return document
      .querySelector(this._selectorTemplateElement)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  _checkCurrentUserLike() {
    return this._card.likes.some(card => card._id === this._userId);
  }

  _clickCard = (evt) => {
    const target = evt.target;
    if (target.classList.contains("like")) {
      const card = evt.currentTarget;
      this._handleLikeClick(target, card);
    }
    if (target.classList.contains("trash")) {
      this._handleDeleteIconClick();
    }
    if (target.classList.contains("element__img")) {
      this._handleCardClick();
    }
  };

  _setEventListeners() {
    this._element.addEventListener("click", this._clickCard);
  }

  generate() {
    this._element = this._createElement();
    this._element.dataset.id = this._card._id;

    const item = (selector) => this._element.querySelector(selector);
    item(".element__img").src = this._card.link;
    item(".element__figcaption").textContent = this._card.name;
    item(".element__img").alt = this._card.name;
    item(".like__numbers").textContent = this._card.likes.length;

    this._checkCurrentUserLike() ? item(".like").classList.add("like_click") : null;
    this._card.owner._id === this._userId ? item(".trash").classList.add("trash_include") : null;

    this._setEventListeners();

    return this._element;
  }
}
