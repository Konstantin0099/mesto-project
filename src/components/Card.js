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

  _countLikes(card, arrayLikes) {
    card.querySelector(".like__numbers").textContent = arrayLikes.length;
  }

  _checkLikes(likeElement) {
    return likeElement.classList.contains("like_click");
  }

  _setEventListeners() {
    const likeElement = this._element.querySelector('.like');
    const trashElement = this._element.querySelector('.trash');
    const imageElement = this._element.querySelector('.element__img');

    likeElement.addEventListener('click', this._handleLikeClick.bind(this));
    trashElement.addEventListener('click', this._handleDeleteIconClick.bind(this));
    imageElement.addEventListener('click', this._handleCardClick.bind(this));
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
