

class Card {
  constructor({ nameMesto, imageUrl, likes, _id, owner}, selectorTemplateElement) { // card = { nameMesto, imageUrl, likes, _id,}
    this._nameMesto = nameMesto;
    this._imageUrl = imageUrl;
    this._likes = likes;
    this._id = _id;
    this.owner._id = owner._id;
    this._selectorTemplateElement = selectorTemplateElement;
    
  }
    _handleCardClick() {
      const cardElement = document
          .querySelector(this._selectorTemplateElement)
          .content
          .querySelector('.element')
          .cloneNode(true);

    return cardElement;
      };

      _checkMyLikesInit() {
        return this._likes.some((card) => {
          return card._id === ownerId;
        });
      }

      _handleOpenPopup(){
        popupImage.src = this._image;
        popupElement.classList.add("popup_is-opened");
      }
      _handleClosePopup(){
        popupImage.src = "";
        popupElement.classList.remove("popup_is-opened");
      }

      _setEventListeners() {
        this._element.addEventListener('click', () => {
          this._handleOpenPopup()
        });
        popupCloseButton.addEventListener('click', () => {
          this._handleClosePopup()
        });

      }
      generate() {
        this._element = this._handleCardClick();
        this._setEventListeners(); 
        this._element.querySelector('.element__img').src = this._imageUrl;
        this._element.querySelector('.element__figcaption').textContent = this._nameMesto;
        this._element.querySelector('.element__img').alt = this._nameMesto;
        this._element.querySelector(".like__numbers").textContent = this._likes.length;
        this._element.id = this._id;
        if (_checkMyLikesInit()) {
          this._element.querySelector(".like").classList.toggle("like_click");// может лучше .add("like_click")?
        }
        if (this.owner._id === ownerId) {
          newCard.querySelector(".trash").classList.add("trash_include");
        }
    
        return this._element;
      }

    }
  
    






import { openPopupDeleteCard, openPopup, elements, ownerId } from "./modal";
import { deleteCard, likeCard, deleteLikeCard, resOk } from "./api";
const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");
const imgPopup = popupImg.querySelector(".img-popup");
const popupFigcaption = popupImg.querySelector(".popup-figcaption");
const elementSectionTemplate =
  document.querySelector("#elementsSection").content;
function checkLikes(likeItem) {
  return likeItem.classList.contains("like_click");
}
// function toggleClassLike(likeItem) {
//   likeItem.classList.toggle("like_click");
// }
// function countLikes(card, arrayLikes) {
//   card.querySelector(".like__numbers").textContent = arrayLikes.length;
// }
function toggleLikeCard(func, card) {
  resOk(func(card.id))
    .then((res) => {
      countLikes(card, res.likes);
    })
    .catch((err) => {
      console.log("ОШИБКА_Лайка__", err);
    })
    .finally(() => {});
}
function clickLike(likeItem, card) {
  if (checkLikes(likeItem)) {
    toggleLikeCard(deleteLikeCard, card);
  } else {
    toggleLikeCard(likeCard, card);
  }
  toggleClassLike(likeItem);
}
function checkMyCard(card) {
  return card.owner._id === ownerId;
}
function clickImg(imgItem, card) {
  imgPopup.src = imgItem.src;
  imgPopup.alt = imgItem.alt;
  popupFigcaption.textContent = imgItem.alt;
  openPopup(popupPicture);
}

const clickCard = (evt) => {
  const item = evt.target;
  const card = evt.currentTarget;
  if (item.classList.contains("like")) {
    clickLike(item, card);
  }
  if (item.classList.contains("trash")) {
    openPopupDeleteCard(card);
  }
  if (item.classList.contains("element__img")) {
    clickImg(item, card);
  }
};
function checkMyLikesInit(arrayLikes) {
  return arrayLikes.some((card) => {
    return card._id === ownerId;
  });
}






function createElementSection(card) {

  const newCard = elementSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  const imgNewCard = newCard.querySelector(".element__img");
  imgNewCard.src = card.link;
  imgNewCard.alt = card.name;
  newCard.id = card._id;
  newCard.querySelector(".element__figcaption").textContent = card.name;
  countLikes(newCard, card.likes);
  if (checkMyLikesInit(card.likes)) {
    toggleClassLike(newCard.querySelector(".like"));
  }
  if (checkMyCard(card)) {
    newCard.querySelector(".trash").classList.add("trash_include");
  }
  newCard.addEventListener("click", clickCard);

return newCard;
}

function initialCards(arrayCards) {
  arrayCards.forEach((card) => {
    elements.append(createElementSection(card))
    // createElementSection(card, "append");
  });
}
export { createElementSection, initialCards };
