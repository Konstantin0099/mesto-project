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

// function createElementSection(card, metod) {

// function resolveImg() {
// console.log("Успешная загрузка NAME=", card.name)
//   imgNewCard.alt = card.name;
//   newCard.id = card._id;
//   newCard.querySelector(".element__figcaption").textContent = card.name;
//   countLikes(newCard, card.likes);

//   if (checkMyLikesInit(card.likes)) {
//     toggleClassLike(newCard.querySelector(".like"));
//   }
//   if (checkMyCard(card)) {
//     newCard.querySelector(".trash").classList.add("trash_include");
//   }
//   newCard.addEventListener("click", clickCard);
//  if (metod === "prepend") {console.log("prepend"), elements.prepend(newCard)}
//  if (metod === "append") {console.log("append"), elements.append(newCard)}
// };
// function rejectImg() {
// console.log("Ошибка загрузки catch=", card.name)
//   newCard.closest(".element").remove();

// };
//   const newCard = elementSectionTemplate
//     .querySelector(".element")
//     .cloneNode(true);
//   const imgNewCard = newCard.querySelector(".element__img");
//   imgNewCard.src = card.link;
//   console.log("createElementSection", card.name);
//   imgNewCard.onload = resolveImg;
//   imgNewCard.onerror = rejectImg;
// }

// function createElementSection(card, metod) {
//   // console.log("createElementSection=", card, metod);
//   const newCard = elementSectionTemplate
//     .querySelector(".element")
//     .cloneNode(true);
//   const imgNewCard = newCard.querySelector(".element__img");
//   const PromiseImg = new Promise(function (resolve, reject) {
//     // document.createElement("img").src = card.link;
//     const img = document.createElement("img");
//     img.src = card.link;
//     // imgNewCard.src = card.link;
//     imgNewCard.onload = resolve(card);
//     imgNewCard.onerror = reject(card);
//   });
//   PromiseImg.then((res) => {
//     console.log("Успешная загрузка NAME=", card.name, res);
//     imgNewCard.alt = card.name;
//     imgNewCard.src = card.link;
//     newCard.id = card._id;
//     newCard.querySelector(".element__figcaption").textContent = card.name;
//     countLikes(newCard, card.likes);

//     if (checkMyLikesInit(card.likes)) {
//       toggleClassLike(newCard.querySelector(".like"));
//     }
//     if (checkMyCard(card)) {
//       newCard.querySelector(".trash").classList.add("trash_include");
//     }
//     newCard.addEventListener("click", clickCard);
//     if (metod === "prepend") {
//       console.log("prepend"), elements.prepend(newCard);
//     }
//     if (metod === "append") {
//       console.log("append"), elements.append(newCard);
//     }
//   }).catch((res) => {
//     console.log("Ошибка загрузки catch____________________=", res.name);
//     newCard.closest(".element").remove();
//   });
// }

// function handleError(){
//   console.log("Ошибка загрузки ______________________=", evt);
//   // newCard.closest(".element").remove();
// }
// function handleImg(evt){
//   console.log("загрузки OK  = ", evt.type);
//   // elements.append(evt.target);
// }
function loadImage(card) {
  
  const newCard = elementSectionTemplate
  .querySelector(".element")
  .cloneNode(true);
  const imgNewCard = newCard.querySelector(".element__img");
  // const img = document.createElement("img");
  // img.src = card.link;
  imgNewCard.src = card.link;
  elements.append(newCard);
  // console.log("newCard = ", newCard);
  imgNewCard.onload = function() { console.log("загрузки OK  = ", newCard)}
  imgNewCard.onerror = function() { console.log("Ошибка загрузки ____карточку удаляем"), newCard.closest(".element").remove()}
}
function initialCards(arrayCards) {
  arrayCards.forEach((card) => {
    loadImage(card);
    // createElementSection(card, "append");
  });
}
export {initialCards };
// export { createElementSection, initialCards };
