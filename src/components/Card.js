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

  checkLikes() {
    return this._element.querySelector('.like').classList.contains("like_click");
  }

  _toggleLikeFunction = (res) => {
    this._element.querySelector(".like__numbers").textContent = res.likes.length;
    this._element.querySelector('.like').classList.toggle("like_click");
  }

  _getItem(selector) {
    return this._element.querySelector(selector);
  }

  _setEventListeners() {
    const likeElement = this._getItem('.like');
    const trashElement = this._getItem('.trash');
    const imageElement = this._getItem('.element__img');

    likeElement.addEventListener('click', this._handleLikeClick.bind(
        this,
        this._toggleLikeFunction
      )
    );
    trashElement.addEventListener('click', this._handleDeleteIconClick.bind(this));
    imageElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  generate() {
    this._element = this._createElement();
    this._element.dataset.id = this.card._id;

    this._getItem(".element__img").src = this.card.link;
    this._getItem(".element__figcaption").textContent = this.card.name;
    this._getItem(".element__img").alt = this.card.name;
    this._getItem(".like__numbers").textContent = this.card.likes.length;

    this._checkCurrentUserLike() ? this._getItem(".like").classList.add("like_click") : null;
    this.card.owner._id === this._userId ? this._getItem(".trash").classList.add("trash_include") : null;
    this._setEventListeners();
    return this._element;
  }
}
