export default class Card {
  constructor(
    card,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
    selectorTemplateElement
  ) {
    this.card = card;
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
    return this.card.likes.some(card => card._id === this._userId);
  }

  countLikes(card, arrayLikes) {
    card.querySelector(".like__numbers").textContent = arrayLikes.length;
  }

  checkLikes(likeElement) {
    return likeElement.classList.contains("like_click");
  }

  _setEventListeners() {
    const likeElement = this.element.querySelector('.like');
    const trashElement = this.element.querySelector('.trash');
    const imageElement = this.element.querySelector('.element__img');

    likeElement.addEventListener('click', this._handleLikeClick.bind(this));
    trashElement.addEventListener('click', this._handleDeleteIconClick.bind(this));
    imageElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  generate() {
    this.element = this._createElement();
    this.element.dataset.id = this.card._id;

    const item = (selector) => this.element.querySelector(selector);
    item(".element__img").src = this.card.link;
    item(".element__figcaption").textContent = this.card.name;
    item(".element__img").alt = this.card.name;
    item(".like__numbers").textContent = this.card.likes.length;

    this._checkCurrentUserLike() ? item(".like").classList.add("like_click") : null;
    
    this.card.owner._id === this._userId ? item(".trash").classList.add("trash_include") : null;

    this._setEventListeners();

    return this.element;
  }
}
