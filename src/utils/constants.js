const profile = document.querySelector(".profile");
const profileInfoName = profile.querySelector(".profile-info__name");
const profileInfoVocation = profile.querySelector(".profile-info__vocation");
const profileAvatar = profile.querySelector(".profile__avatar");

const profileAvatarClick = document.querySelector('.profile__avatar-click');
const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

export {
  profile, profileInfoName, profileInfoVocation, profileAvatar,
  profileAvatarClick, profileInfoEditButton, profileAddButton
}