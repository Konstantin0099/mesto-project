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
function toggleClassLike(likeItem) {
  likeItem.classList.toggle("like_click");
}
function countLikes(card, arrayLikes) {
  card.querySelector(".like__numbers").textContent = arrayLikes.length;
}
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
function createElementSection(card, metod) {
  const newCard = elementSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  const imgNewCard = newCard.querySelector(".element__img");
  imgNewCard.onload = resolve;
  imgNewCard.onerror = reject;
  imgNewCard.src = card.link;
  if (metod === "prepend") {
    elements.prepend(newCard);
  }
  if (metod === "append") {
    elements.append(newCard);
  }
  function resolve() {
    newCard.id = card._id;
  }
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
  function reject() {
    console.log("Ошибка загрузки______________");
  }
}

function initialCards(arrayCards) {
  arrayCards.forEach((card) => {
    createElementSection(card, "append");
  });
}
export { createElementSection, initialCards };
