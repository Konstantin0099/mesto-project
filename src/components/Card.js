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

  checkLikes(card) {
    return card.querySelector('.like').classList.contains("like_click");
  }

  _toggleLikeFunction(res, card) {
    card.querySelector(".like__numbers").textContent = res.likes.length;
    card.querySelector('.like').classList.toggle("like_click");

  }

  _item(selector) {
    return this.element.querySelector(selector);
  }

  _setEventListeners() {
    const likeElement = this._item('.like');
    const trashElement = this._item('.trash');
    const imageElement = this._item('.element__img');

    likeElement.addEventListener('click', this._handleLikeClick.bind(
        this,
        this._toggleLikeFunction,
        this.element
      )
    );
    trashElement.addEventListener('click', this._handleDeleteIconClick.bind(this));
    imageElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  generate() {
    this.element = this._createElement();
    this.element.dataset.id = this.card._id;

    this._item(".element__img").src = this.card.link;
    this._item(".element__figcaption").textContent = this.card.name;
    this._item(".element__img").alt = this.card.name;
    this._item(".like__numbers").textContent = this.card.likes.length;

    this._checkCurrentUserLike() ? this._item(".like").classList.add("like_click") : null;
    this.card.owner._id === this._userId ? this._item(".trash").classList.add("trash_include") : null;
    this._setEventListeners();
    return this.element;
  }
}
