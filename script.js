
const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");

const popapProfile = document.querySelector(".popup_profile-info"); 
const popapProfileInfo = popapProfile.querySelector(".popap__container");

const popapCardAdd = document.querySelector(".popup_card-add");
const popapElement = popapCardAdd.querySelector(".popap__container");

const popupPicture = document.querySelector(".popup_picture");
const popapImg = popupPicture.querySelector(".popap-img");
popapClick(popapImg);
const inputSubmitItemProfileInfo = popapProfileInfo.querySelector(
  ".input-container"
);
const inputSubmitItemElement = popapElement.querySelector(
  ".input-container"
);
const elements = document.querySelector(".elements");
const elementsSectionTemplate =
  document.querySelector("#elementsSection").content;

function addPopap(addPopap) {
  addPopap.classList.add("popap_opened");
  addPopap.parentElement.classList.add("popap_opened")
}

function closePopap(closePopap) {
  closePopap.parentElement.classList.remove("popap_opened");
  closePopap.parentElement.classList.remove("popap_black");
  closePopap.classList.remove("popap_opened");
  closePopap.classList.remove("popap-img_opened");
}
function popapClick(popapClick) {
  popapClick
    .querySelector(".popap__click")
    .addEventListener("click", function (evt) {
      evt.preventDefault();
      closePopap(popapClick
        .querySelector(".popap__click")
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
  return card;
}

// document.querySelector(".element__img").addEventListener("click", function () {console.log("работает")});

function openPopupImage(elementSection, initialCards, initialname) {
  elementSection // вызов модального окна нажатием на картинку
    .querySelector(".element__img")
    .addEventListener("click", function () {
      popapImg.querySelector(".img-popap").setAttribute("src", initialCards);
      popapImg.querySelector(".img-popap").setAttribute("alt", initialname);
      popapImg.querySelector(".popap-figcaption").textContent = initialname;
      popapImg.classList.add("popap-img_opened");
      addPopap(popapImg);
      // popap.classList.add("popap_opened", "popap_black");
    });
}
popapClick(popapProfileInfo); 
popapClick(popapElement);
profileInfoEditButton.addEventListener("click", function () {
  addPopap(popapProfileInfo);
});
profileAddButton.addEventListener("click", function () {
  addPopap(popapElement);
});

inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
    profile.querySelector(".profile-info__name").textContent =
    popapProfileInfo.querySelector(
      ".input-container__item_name").value;
    profile.querySelector(".profile-info__vocation").textContent =
    popapProfileInfo.querySelector(
      ".input-container__item_profession").value;
    closePopap(popapProfileInfo);
    evt.target.reset(); // очистка формы
  });
inputSubmitItemElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const link = popapElement.querySelector(
        ".input-container__item_url").value;
  const name = popapElement.querySelector(
          ".input-container__item_nameMesto").value;
  const newcard = addElementSection(link, name);
  elements.prepend(newcard);// добавляем карточку на страницу
  openPopupImage(newcard, link, name);
  elementLike(newcard);
  elementtrash(newcard);
  closePopap(popapElement);
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
    elementLike(itemOfBox);
    elementtrash(itemOfBox);
    elements.prepend(itemOfBox);
}
)
