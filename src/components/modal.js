import { createElementSection } from "../components/card";
import {
  editDataProfile,
  editAvatarProfile,
  resOk,
  addNewCard,
  deleteCard,
} from "../components/api";

let ownerId = 0;
const profile = document.querySelector(".profile");
const profileInfoName = profile.querySelector(".profile-info__name");
const profileInfoVocation = profile.querySelector(".profile-info__vocation");
const profileAvatar = profile.querySelector(".profile__avatar");
const elements = document.querySelector(".elements");

const popupUpdateAvatar = document.querySelector(".popup_update-avatar");
const inputSubmitUpdateAvatar =
  popupUpdateAvatar.querySelector(".input-container");
const urlUpdateAvatar = popupUpdateAvatar.querySelector(
  ".input-container__item_avatar"
);

const popupProfile = document.querySelector(".popup_profile-info");
const popupProfileInfo = popupProfile.querySelector(".popup__container");
const namePopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_name"
);
const professionPopupProfileInfo = popupProfileInfo.querySelector(
  ".input-container__item_profession"
);
const inputSubmitItemProfileInfo =
  popupProfileInfo.querySelector(".input-container");
const popupCardAdd = document.querySelector(".popup_card-add");
const inputContainerSubmitItem = popupCardAdd.querySelector(
  `.input-container__submit-item`
);
const popupCardDelete = document.querySelector(".popup_delete-card");
const buttonConfirmDelete = popupCardDelete.querySelector(
  `.input-container__submit-item`
);
const newCardPopup = popupCardAdd.querySelector(".popup__container");
const inputSubmitItemElement = newCardPopup.querySelector(".input-container");
const inputContainerItemNameMesto = newCardPopup.querySelector(
  ".input-container__item_nameMesto"
);
const inputContainerItemUrl = newCardPopup.querySelector(
  ".input-container__item_url"
);
const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target === popup.querySelector(".popup__click")
    ) {
      closePopup(popup);
    }
  });
});
const openPopupProfileInfo = () => {
  namePopupProfileInfo.value = profileInfoName.textContent;
  professionPopupProfileInfo.value = profileInfoVocation.textContent;
  openPopup(popupProfile);
};
const openPopupAddCard = () => {
  inputContainerItemUrl.value = "";
  inputContainerItemNameMesto.value = "";
  openPopup(popupCardAdd);
};

const openPopupEditAvatar = () => {
  urlUpdateAvatar.value = "";
  openPopup(popupUpdateAvatar);
};

const openPopupDeleteCard = (card) => {
 
  openPopup(popupCardDelete);
  const confirmDelete = () => {
    buttonSavingData(popupCardDelete, " Удаление....");
    deleteCard(card.id)
      .then(() => {
        card.closest(".element").remove();
        closePopup(popupCardDelete);
        buttonConfirmDelete.removeEventListener("click", confirmDelete);
      })
      .catch((err) => {
        console.log("ОШИБКА___", err);
      })
      .finally(() => {
        buttonSavingData(popupCardDelete, " Да ");
      });
  };
  buttonConfirmDelete.addEventListener("click", confirmDelete);
};

function openPopup(overlay) {
  overlay.classList.add("popup_opened");
  document.addEventListener("keydown", keyDownEscape);
}
const closePopup = (overlay) => {
  overlay.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyDownEscape);
};

const keyDownEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

function addProfileInfo(profile) {
  ownerId = profile._id;
  profileInfoName.textContent = profile.name;
  profileInfoVocation.textContent = profile.about;
  profileAvatar.src = profile.avatar;
  profileAvatar.alt = profile.name + ", " + profile.about;
}
function buttonSavingData(form, text) {
  form.querySelector(".input-container__submit-item").textContent = text;
}
function addAvatar(avatar) {
  profileAvatar.src = avatar.avatar;
}

inputSubmitUpdateAvatar.addEventListener("submit", function (evt) {
  buttonSavingData(inputSubmitUpdateAvatar, "Сохранение....");
  evt.preventDefault();
  editAvatarProfile(urlUpdateAvatar.value)
    .then((avatar) => {
      addAvatar(avatar);
      closePopup(popupUpdateAvatar);
      inputSubmitUpdateAvatar.disabled = true;
    })
    .catch((err) => {
      console.log("ОШИБКА_UpdateAvatar__", err);
    })
    .finally(() => {
      buttonSavingData(inputSubmitUpdateAvatar, "Сохранить");
    });
});

inputSubmitItemProfileInfo.addEventListener("submit", function (evt) {
  buttonSavingData(inputSubmitItemProfileInfo, "Сохранение....");
  evt.preventDefault();
    editDataProfile(
      namePopupProfileInfo.value,
      professionPopupProfileInfo.value
    )
    .then((profile) => {
      addProfileInfo(profile);
      closePopup(popupProfile);
      inputSubmitItemProfileInfo.disabled = true;
    })
    .catch((err) => {
      console.log("ОШИБКА_ProfileInfo__", err);
    })
    .finally(() => {
      buttonSavingData(inputSubmitItemProfileInfo, "Сохранить");
    });
});

inputSubmitItemElement.addEventListener("submit", function (evt) {
  buttonSavingData(inputSubmitItemElement, "Сохранение....");
  evt.preventDefault();
  const newCard = {
    link: inputContainerItemUrl.value,
    name: inputContainerItemNameMesto.value,
  };
  addNewCard(newCard.name, newCard.link)
    .then((card) => {
      // elements.prepend(createElementSection(card));
      // createElementSection(card, "prepend");
      closePopup(popupCardAdd);
      evt.target.reset();
      inputContainerSubmitItem.disabled = true;
    })
    .catch((err) => {
      console.log("ОШИБКА__ItemElement_", err);
    })
    .finally(() => {
      buttonSavingData(inputSubmitItemElement, "Сохранить");
    });
});

export {
  openPopupProfileInfo,
  openPopupAddCard,
  openPopupDeleteCard,
  openPopupEditAvatar,
  openPopup,
  addProfileInfo,
  profile,
  elements,
  ownerId,
};
