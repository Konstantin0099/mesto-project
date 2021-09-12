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
  const namePopupProfileInfo = popupProfileInfo.querySelector(".input-container__item_name");
  const professionPopupProfileInfo = popupProfileInfo.querySelector(".input-container__item_profession");

const inputSubmitItemElement = newCardPopup.querySelector(".input-container");
const elements = document.querySelector(".elements");
const elementSectionTemplate =
  document.querySelector("#elementsSection").content;
setPopupCloseButtonEventListener(popupImg);
setPopupCloseButtonEventListener(popupProfileInfo);
setPopupCloseButtonEventListener(newCardPopup);
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.parentElement.classList.add("popup_opened");
}
function closePopup(closePopup) {
  closePopup.parentElement.classList.add("popup_closed");
  closePopup.parentElement.classList.remove("popup_opened");
  closePopup.classList.remove("popup_opened");
}
function setPopupCloseButtonEventListener(popup) {
  popup
    .querySelector(".popup__click")
    .addEventListener("click", function (evt) {
      closePopup(popup);
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
      evt.target.closest(".element").remove();
    });
}
function createElementSection(card) {
  // функция возвращает карточку
  const newCard = elementSectionTemplate
    .querySelector(".element")
    .cloneNode(true);
  newCard.querySelector(".element__img").src = card.link;
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
      popupImg.querySelector(".img-popup").src = card.link;
      popupImg.querySelector(".img-popup").alt = card.name;
      popupImg.querySelector(".popup-figcaption").textContent = card.name;
      openPopup(popupImg);
    });
}
profileInfoEditButton.addEventListener("click", function () {
  namePopupProfileInfo.value =
    profile.querySelector(".profile-info__name").textContent;
    professionPopupProfileInfo.value =
    profile.querySelector(".profile-info__vocation").textContent;
  openPopup(popupProfileInfo);
});
profileAddButton.addEventListener("click", function () {
  newCardPopup.querySelector(".input-container__item_url").value = "";
  newCardPopup.querySelector(".input-container__item_nameMesto").value = "";
  openPopup(newCardPopup);
});
inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profile.querySelector(".profile-info__name").textContent =
    popupProfileInfo.querySelector(".input-container__item_name").value;
  profile.querySelector(".profile-info__vocation").textContent =
    popupProfileInfo.querySelector(".input-container__item_profession").value;
  closePopup(popupProfileInfo);
});
inputSubmitItemElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    link: newCardPopup.querySelector(".input-container__item_url").value,
    name: newCardPopup.querySelector(".input-container__item_nameMesto").value,
  };
  elements.prepend(createElementSection(newCard)); // добавляем карточку на страницу
  closePopup(newCardPopup);
  evt.target.reset(); // очистка формы
});

initialCards.forEach((card) => {
  elements.append(createElementSection(card));
});
