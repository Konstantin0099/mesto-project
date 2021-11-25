// класса Card
// Поработайте с функциональностью работы карточек и валидации форм. 
// Всю валидацию форм вы до этого писали в отдельном файле, а работу карточек — в другом. Теперь преобразуйте функции, которые существовали ранее, в единое целое — классы Card и FormValidator. В этом пункте задания поговорим про класс Card.
// Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
// * 		принимает в конструктор её данные и селектор её template-элемента;
// * 		содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// * 		содержит приватные методы для каждого обработчика;
// * 		содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом. 
// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
// При клике на карточку эта функция должна открывать попап с картинкой.
import 
  {ownerId}
 from "../utils/constants";


export default class Card {
  constructor(data, selectorTemplateElement) { // card = { nameMesto, imageUrl, likes, _id,}
    this._nameMesto = data.name;
    this._imageUrl = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    // this._handleCardClick = handleCardClick; // чтобы Card принимал в конструктор функцию handleCardClick. 
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
      return card._id === ownerId;
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

  _handleCardClick(){
    console.log("+++++++_handleCardClick()+++++");
  };
  _setEventListeners() {
    this._element.addEventListener('click',
      this._clickCard
     //this._handleCardClick()    // При клике на карточку эта функция должна открывать попап с картинкой.
    );
  }

  _checkLikes(likeItem) {
    console.log("_checkLikes__", likeItem.classList.contains("like_click"));
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
    // console.log("likeItem, card", likeItem, card);
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
    // console.log("evt.target_____", evt.target);
    const item = evt.target;
    const card = evt.currentTarget;
    if (item.classList.contains("like")) {
      console.log("нажали лайк");
      this._clickLike(item, card);
    }
    if (item.classList.contains("trash")) {
      console.log("нажали удалить");
      // this._openPopupDeleteCard(card);
    }
    if (item.classList.contains("element__img")) {
      console.log("нажали на картинку");
      // this._clickImg(item, card);
    }
  };

  generate() {
    // console.log("+++++++this._nameMesto+++++", this._nameMesto);
    this._element = this._createElement();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._imageUrl;
    this._element.querySelector('.element__figcaption').textContent = this._nameMesto;
    this._element.querySelector('.element__img').alt = this._nameMesto;
    this._element.querySelector(".like__numbers").textContent = this._likes.length;
    this._element.id = this._id;
    if (this._checkMyLikesInit()) {
      this._element.querySelector(".like").classList.add("like_click");
    }
    if (this._ownerId === ownerId) {
      this._element.querySelector(".trash").classList.add("trash_include");
    }
    this._element.addEventListener("click", this._clickCard);
    // console.log("+++++++this._element+++++", this._element);
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

// function checkMyLikesInit(arrayLikes) {
//   return arrayLikes.some((card) => {
//     return card._id === ownerId;
//   });
// }

// function createElementSection(card) {
  // const newCard = elementSectionTemplate
  //   .querySelector(".element")
  //   .cloneNode(true);
  // const imgNewCard = newCard.querySelector(".element__img");
  // imgNewCard.src = card.link;
  // imgNewCard.alt = card.name;
  // newCard.id = card._id;
  // newCard.querySelector(".element__figcaption").textContent = card.name;
  // countLikes(newCard, card.likes);
//   if (checkMyLikesInit(card.likes)) {
//     toggleClassLike(newCard.querySelector(".like"));
//   }
//   if (checkMyCard(card)) {
//     newCard.querySelector(".trash").classList.add("trash_include");
//   }
//   newCard.addEventListener("click", clickCard);

//   return newCard;
// }


// export { createElementSection, initialCards };
