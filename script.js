console.log("старт");
const profile = document.querySelector(".profile");
const profileInfoEditButton = profile.querySelector(
  ".profile-info__edit-button"
);
const inputContainerSubmitItem = profile.querySelector(
  ".input-container__submit-item"
);

const popap = document.querySelector(".popap");
const popapClick = popap.querySelector(".popap__click");
const popapProfileInfo = popap.querySelector(".popap", ".popap-profile-info");
const popapProfileInfo = popap.querySelector(".popap", ".popap-profile-info");
const inputContainerSubmitItem = popap.querySelector(
  ".input-container__submit-item"
);

const elements = document.querySelector(".elements");

profileInfoEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popap.classList.add("popap_opened");
  popapProfileInfo.classList.add(".popap-profile-info");
});
inputContainerSubmitItem.addEventListener("click", function (evt) {
    evt.preventDefault();
    popap.classList.add("popap_opened");
    popapProfileInfo.classList.add(".popap-element");
  });

popapClick.addEventListener("click", function (evt) {
  evt.preventDefault();
  popap.classList.remove("popap_opened");
  popapProfileInfo.classList.remove(".popap-profile-info");
});

inputContainerSubmitItem.addEventListener("click", function (evt) {
  evt.preventDefault();
  const inputContainerItems = popap.querySelectorAll(".input-container__item");
  profile.querySelector(".profile-info__name").textContent =
    inputContainerItems[0].value;
  profile.querySelector(".profile-info__vocation").textContent =
    inputContainerItems[1].value;
  popap.classList.remove("popap_opened");
  popapProfileInfo.classList.add(".popap-profile-info");
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

for (let i = 0; i < initialCards.length - 2; i++) {
  const elementsSectionTemplate =
    document.querySelector("#elementsSection").content;
  const elementSection = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  elementSection
    .querySelector(".element__img")
    .setAttribute("src", initialCards[i].link);
  elementSection.querySelector(".element__figcaption").textContent =
    initialCards[i].name;
  elementSection
    .querySelector(".like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("like_click");
    });

  elements.prepend(elementSection);
}
