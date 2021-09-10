
const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_profile-info"); 
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const popupCardAdd = document.querySelector(".popup_card-add");
const popupElement = popupCardAdd.querySelector(".popup__container");
const popupPicture = document.querySelector(".popup_picture");
const popupImg = popupPicture.querySelector(".popup-img");

const inputSubmitItemProfileInfo = popupProfileInfo.querySelector(
  ".input-container"
);
const inputSubmitItemElement = popupElement.querySelector(
  ".input-container"
);
const elements = document.querySelector(".elements");
const elementsSectionTemplate =
  document.querySelector("#elementsSection").content;
popupClick(popupImg);
popupClick(popupProfileInfo); 
popupClick(popupElement);
function addPopup(addPopup) {
  addPopup.classList.add("popup_opened");
  addPopup.parentElement.classList.add("popup_opened")
}

function closePopup(closePopup) {
  closePopup.parentElement.classList.add("popup_closed");
  closePopup.parentElement.classList.remove("popup_opened");
  closePopup.classList.remove("popup_opened")
}
function popupClick(popupClick) {
  popupClick
    .querySelector(".popup__click")
    .addEventListener("click", function (evt) {
      evt.preventDefault();
      closePopup(popupClick
        .querySelector(".popup__click")
        .parentElement);
    });
}
function elementLike(elementLike) {
  elementLike // логика кнопки "лайк"
    .querySelector(".like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("like_click");
    });
}
function elementtrash(elementtrash) {
  elementtrash // логика кнопки "удалить"
    .querySelector(".trash")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
}
function addElementSection(link, name) { // функция возвращает карточку 
  const card = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  card.querySelector(".element__img").setAttribute("src", link);
  card.querySelector(".element__figcaption").textContent = name;
  elementLike(card);
  elementtrash(card);
  return card;
}
function openPopupImage(elementSection, link, name) {
  elementSection // вызов модального окна нажатием на картинку
    .querySelector(".element__img")
    .addEventListener("click", function () {
      popupImg.querySelector(".img-popup").setAttribute("src", link);
      popupImg.querySelector(".img-popup").setAttribute("alt", name);
      popupImg.querySelector(".popup-figcaption").textContent = name;
      addPopup(popupImg);
    });
}
profileInfoEditButton.addEventListener("click", function () {
  addPopup(popupProfileInfo);
});
profileAddButton.addEventListener("click", function () {
  addPopup(popupElement);
});

inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
    profile.querySelector(".profile-info__name").textContent =
    popupProfileInfo.querySelector(
      ".input-container__item_name").value;
    profile.querySelector(".profile-info__vocation").textContent =
    popupProfileInfo.querySelector(
      ".input-container__item_profession").value;
    closePopup(popupProfileInfo);
    evt.target.reset(); // очистка формы
  });
inputSubmitItemElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const link = popupElement.querySelector(
        ".input-container__item_url").value;
  const name = popupElement.querySelector(
          ".input-container__item_nameMesto").value;
  const newcard = addElementSection(link, name);
  elements.prepend(newcard);// добавляем карточку на страницу
  openPopupImage(newcard, link, name);
  closePopup(popupElement);
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

initialCards.forEach( arrayCard => {
  let itemOfBox = addElementSection(arrayCard.link, arrayCard.name);
    openPopupImage(itemOfBox, arrayCard.link, arrayCard.name);
    elements.prepend(itemOfBox);
}
)
