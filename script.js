console.log("старт");
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
// const clickImg = 

const elements = document.querySelector(".elements");

profileInfoEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popap.classList.add("popap_opened");
  popapProfileInfo.classList.add("popap-profile-info");
  const popapClick = popapProfileInfo.querySelector(".popap__click");
  Click(popapClick);
});

profileAddButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popap.classList.add("popap_opened");
  popapElement.classList.add("popap-element");
  console.log(popapElement);
  const popapClick = popapElement.querySelector(".popap__click");
  Click(popapClick);
});

function Click(popapClick) {
  popapClick.addEventListener("click", function (evt) {
    evt.preventDefault();
    popap.classList.remove("popap_opened");
    popapProfileInfo.classList.remove("popap-profile-info");
    popapElement.classList.remove("popap-element");
  });
}

inputSubmitItemProfileInfo.addEventListener("click", function (evt) {
  evt.preventDefault();
  const inputContainerItems = popapProfileInfo.querySelectorAll(
    ".input-container__item"
  );
  profile.querySelector(".profile-info__name").textContent =
    inputContainerItems[0].value;
  profile.querySelector(".profile-info__vocation").textContent =
    inputContainerItems[1].value;
  popap.classList.remove("popap_opened");
  popapProfileInfo.classList.remove("popap-profile-info");
});

inputSubmitItemElement.addEventListener("click", function (evt) {
  evt.preventDefault();
  const inputContainerItems = popapElement.querySelectorAll(
    ".input-container__item"
  );
  const elementsSectionTemplate =
    document.querySelector("#elementsSection").content;
  const elementSection = elementsSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  elementSection
    .querySelector(".element__img")
    .setAttribute("src", inputContainerItems[1].value);
  elementSection.querySelector(".element__figcaption").textContent =
    inputContainerItems[0].value;
  elementSection
    .querySelector(".like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("like_click");
    });
    elementSection
    .querySelector(".trash")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
  elements.prepend(elementSection);

  popap.classList.remove("popap_opened");
  popapProfileInfo.classList.remove("popap-element");
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
    .querySelector(".element__img").addEventListener("click", function (evt) {
        popap.classList.add("popap_opened");
        console.log("popapImg" + popapImg);
        console.log("popapImg.querySelector('.img-popap')" + popapImg.querySelector(".img-popap"));
        // popapImg.style.backgroundImage = 'url('+initialCards[i].link+')';
         popapImg.querySelector(".img-popap").setAttribute("src", initialCards[i].link);
        // console.log("popapImg.style.backgroundImage" + popapImg.style.backgroundImage);
        popapImg.classList.add("popap-img_opened");
    
      });
    elementSection
    .querySelector(".like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("like_click");
    }); 
    elementSection
    .querySelector(".trash")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
  elements.prepend(elementSection);
}
