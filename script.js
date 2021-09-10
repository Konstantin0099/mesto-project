const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_profile-info");
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const popupCardAdd = document.querySelector(".popup_card-add");
const newCardPopup = popupCardAdd.querySelector(".popup__container");
const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");

const inputSubmitItemProfileInfo =
  popupProfileInfo.querySelector(".input-container");
const inputSubmitItemElement = newCardPopup.querySelector(".input-container");
const elements = document.querySelector(".elements");
const elementsSectionTemplate =
  document.querySelector("#elementsSection").content;
setPopupCloseButtonEventListener(popupImg);
setPopupCloseButtonEventListener(popupProfileInfo);
setPopupCloseButtonEventListener(newCardPopup);
function openPopap(popap) {
  popap.classList.add("popup_opened");
  popap.parentElement.classList.add("popup_opened");
}
function closePopup(closePopup) {
  closePopup.parentElement.classList.add("popup_closed");
  closePopup.parentElement.classList.remove("popup_opened");
  closePopup.classList.remove("popup_opened");
}
function setPopupCloseButtonEventListener(card) {
  card.querySelector(".popup__click").addEventListener("click", function (evt) {
    closePopup(card.querySelector(".popup__click").parentElement);
  });
}
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
      evt.target.parentElement.remove();
    });
}
function addElementSection(link, name) {
  // функция возвращает карточку
  const card = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  card.querySelector(".element__img").src = link;
  card.querySelector(".element__figcaption").textContent = name;

  setLikeButtonEventListener(card);
  setRemoveCardEventListener(card);
  return card;
}
function setImageClickEventListenere(elementSection, link, name) {
  elementSection // вызов модального окна нажатием на картинку
    .querySelector(".element__img")
    .addEventListener("click", function () {
      popupImg.querySelector(".img-popup").src = link;
      popupImg.querySelector(".img-popup").alt = name;
      popupImg.querySelector(".popup-figcaption").textContent = name;
      openPopap(popupImg);
    });
}
profileInfoEditButton.addEventListener("click", function () {
  openPopap(popupProfileInfo);
});
profileAddButton.addEventListener("click", function () {
  openPopap(newCardPopup);
});

inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profile.querySelector(".profile-info__name").textContent =
    popupProfileInfo.querySelector(".input-container__item_name").value;
  profile.querySelector(".profile-info__vocation").textContent =
    popupProfileInfo.querySelector(".input-container__item_profession").value;
  closePopup(popupProfileInfo);
  evt.target.reset(); // очистка формы
});
inputSubmitItemElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const link = newCardPopup.querySelector(".input-container__item_url").value;
  const name = newCardPopup.querySelector(
    ".input-container__item_nameMesto"
  ).value;
  const newcard = addElementSection(link, name);
  elements.prepend(newcard); // добавляем карточку на страницу
  setImageClickEventListenere(newcard, link, name);
  closePopup(newCardPopup);
  evt.target.reset(); // очистка формы
});

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((card) => {
  let itemOfBox = addElementSection(card.link, card.name);
  setImageClickEventListenere(itemOfBox, card.link, card.name);
  elements.prepend(itemOfBox);
});
