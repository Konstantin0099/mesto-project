import { openPopup, elements, ownerId } from "./modal";
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
function addClassLike(likeItem) {
  likeItem.classList.add("like_click");
}
function clickLike(likeItem, card) {
  if (checkLikes(likeItem)) {
    resOk(deleteLikeCard(card.id)).then((res) => {
      likeItem.classList.remove("like_click");
      card.querySelector(".like__numbers").textContent = res.likes.length;
    });
  } else {
    resOk(likeCard(card.id)).then((res) => {
      addClassLike(likeItem);
      card.querySelector(".like__numbers").textContent = res.likes.length;
    });
  }
}
function checkMyCard(card) {
  return card.owner._id === ownerId;
}
function clickDelete(delItem, card) {
  resOk(deleteCard(card.id)).then((res) => {
    card.closest(".element").remove();
  });
  resOk(deleteCard(card.id)).then((res) => {
  });
}
function clickImg(imgItem, card) {
    console.log("imgItem___", imgItem);
   
    imgPopup.src = imgItem.src;
    imgPopup.alt = imgItem.alt;
    popupFigcaption.textContent = imgItem.alt;
    openPopup(popupPicture);
   console.log(card, "___card", imgItem.src, imgItem.alt);
}

const clickCard = (evt) => {
  const item = evt.target;
  const card = evt.currentTarget;
  if (item.classList.contains("like")) {
    clickLike(item, card);
  }
  if (item.classList.contains("trash")) {
    clickDelete(item, card);
  }
  if (item.classList.contains("element__img") ) {
    clickImg(item, card);
  }
};

function checkMyLikesInit(arrayLikes) {
  return arrayLikes.some((card) => {
    return card._id === ownerId;
  });
}
function createElementSection(card) {
  // console.log("function------card.name", card.name);
  const newCard = elementSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  const imgNewCard = newCard.querySelector(".element__img");
  imgNewCard.src = card.link;
  imgNewCard.alt = card.name;
  newCard.id = card._id;
  newCard.querySelector(".element__figcaption").textContent = card.name;
  newCard.querySelector(".like__numbers").textContent = card.likes.length;
  if (checkMyLikesInit(card.likes)) {
    addClassLike(newCard.querySelector(".like"));
  }
  if (checkMyCard(card)) {
    newCard.querySelector(".trash").classList.add("trash_include");
    // setRemoveCardEventListener(newCard);
    console.log("newCard = MyCard", newCard.querySelector(".trash").classList);
  }

  newCard.addEventListener("click", clickCard);
  // setLikeButtonEventListener(newCard);
  // setImageClickEventListener(newCard);
  // setImageClickEventListener(newCard, card);
  return newCard;
}
// function setImageClickEventListener(card) {
//   // elementSection // вызов модального окна нажатием на картинку
//     // .querySelector(".element__img")
//     card.addEventListener("click", 
//     clickCard
//     );
// }

function initialCards(arrayCards) {
  arrayCards.forEach((card) => {
    elements.append(createElementSection(card));
  });
}

export { createElementSection, initialCards };
