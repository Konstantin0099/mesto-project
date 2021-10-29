import {openPopup, elements} from './modal'; 
const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");

const elementSectionTemplate =
  document.querySelector("#elementsSection").content;

function setLikeButtonEventListener(card) {
    card // логика кнопки "лайк"
      .querySelector(".like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("like_click");
      });
  }
  function setRemoveCardEventListener(card) {
    card // логика кнопки "удалить"
      .querySelector(".trash")
      .addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
      });
  }
  
  function createElementSection(card) {
    // функция возвращает карточку
    const newCard = elementSectionTemplate
      .querySelector(".element")
      .cloneNode(true);
    newCard.querySelector(".element__img").src = card.link;
    newCard.querySelector(".element__figcaption").textContent = card.name;
  
    setLikeButtonEventListener(newCard);
    setRemoveCardEventListener(newCard);
    setImageClickEventListener(newCard, card);
    return newCard;
  }
  function setImageClickEventListener(elementSection, card) {
    elementSection // вызов модального окна нажатием на картинку
      .querySelector(".element__img")
      .addEventListener("click", function () {
        popupImg.querySelector(".img-popup").src = card.link;
        popupImg.querySelector(".img-popup").alt = card.name;
        popupImg.querySelector(".popup-figcaption").textContent = card.name;
        openPopup(popupPicture, popupImg);
      });
  }

export function initialCards(arrayCards) {
    arrayCards.forEach((card) => {
    elements.append(createElementSection(card));
  });};

export {createElementSection}



