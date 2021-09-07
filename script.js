
const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const profileAddButton = profile.querySelector(".profile__add-button");
const popap = document.querySelector(".popap");
const popapProfileInfo = popap.querySelector("#popap-profile-info");
const popapElement = popap.querySelector("#popap-element");
const popapImg = popap.querySelector("#popap-img");
const inputSubmitItemProfileInfo = popapProfileInfo.querySelector(
  ".input-container__submit-item"
);
const inputSubmitItemElement = popapElement.querySelector(
  ".input-container__submit-item"
);
const elements = document.querySelector(".elements");
const elementsSectionTemplate =
  document.querySelector("#elementsSection").content;
function addPopap(addPopap) {
  popap.classList.add("popap_opened");
  addPopap.classList.add("popap_opened");
}
function closePopap(closePopap) {
  popap.classList.remove("popap_opened");
  popap.classList.remove("popap_black");
  closePopap.classList.remove("popap_opened");
  closePopap.classList.remove("popap-img_opened");
}
function popapClick(popapClick) {
  popapClick
    .querySelector(".popap__click")
    .addEventListener("click", function (evt) {
      evt.preventDefault();
      closePopap(popapClick);
      popapClick
        .querySelector(".popap__click")
        .parentElement.classList.remove("popap_opened");
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
function addElementSection(elementAdd, link, name) {
  elementAdd.querySelector(".element__img").setAttribute("src", link);
  elementAdd.querySelector(".element__figcaption").textContent = name;
  elements.prepend(elementAdd);
}

function openPopupImage(elementSection, initialCards, initialname) {
  elementSection // вызов модального окна нажатием на картинку
    .querySelector(".element__img")
    .addEventListener("click", function (evt) {
      popapImg.querySelector(".img-popap").setAttribute("src", initialCards);
      popapImg.querySelector(".img-popap").setAttribute("alt", initialname);
      popapImg.querySelector(".popap-figcaption").textContent = initialname;
      popapImg.classList.add("popap-img_opened");
      popap.classList.add("popap_opened", "popap_black");
    });
}
profileInfoEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  addPopap(popapProfileInfo);
  popapClick(popapProfileInfo);
});
profileAddButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  addPopap(popapElement);
  popapClick(popapElement);
});

inputSubmitItemProfileInfo.addEventListener("click", function (evt) {
  evt.preventDefault();
  const inputContainerItems = popapProfileInfo.querySelectorAll(
    ".input-container__item"
  );
  profile.querySelector(".profile-info__name").textContent =
    inputContainerItems[0].value;
  profile.querySelector(".profile-info__vocation").textContent =
    inputContainerItems[1].value;
  closePopap(popapProfileInfo);
  popap.classList.remove("popap_opened", "popap_black");
});
inputSubmitItemElement.addEventListener("click", function (evt) {
  evt.preventDefault();
  const inputContainerItems = popapElement.querySelectorAll(
    ".input-container__item"
  );
  const elementSection = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  addElementSection(
    elementSection,
    inputContainerItems[1].value,
    inputContainerItems[0].value
  );
  openPopupImage(elementSection, inputContainerItems[1].value, inputContainerItems[0].value);
  elementLike(elementSection);
  elementtrash(elementSection);
  closePopap(popapElement);
  popapClick(popapImg);
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
for (let i = 0; i < initialCards.length; i++) {
  const itemOfBox = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  addElementSection(itemOfBox, initialCards[i].link, initialCards[i].name);
  openPopupImage(itemOfBox, initialCards[i].link, initialCards[i].name);
  elementLike(itemOfBox);
  elementtrash(itemOfBox);
  popapClick(popapImg);
}
