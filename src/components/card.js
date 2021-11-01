import { openPopup, elements } from "./modal";
const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");
const imgPopup = popupImg.querySelector(".img-popup");
const popupFigcaption = popupImg.querySelector(".popup-figcaption");
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
  const newCard = elementSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  newCard.querySelector(".element__img").src = card.link;
  newCard.querySelector(".element__img").alt = card.name;
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
      imgPopup.src = card.link;
      imgPopup.alt = card.name;
      popupFigcaption.textContent = card.name;
      openPopup(popupPicture);
    });
}

export function initialCards(arrayCards) {
  arrayCards.forEach((card) => {
    elements.append(createElementSection(card));
  });
}

export { createElementSection };
