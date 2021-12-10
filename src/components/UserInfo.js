export default class UserInfo {
  constructor(selectorUserName, selectorUserProfession, selectorUserAvatar) {
    this._userNameElement = document.querySelector(selectorUserName);
    this._userProfessionElement = document.querySelector(selectorUserProfession);
    this._userAvatarElement = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userProfessionElement.textContent,
      avatar: this._userAvatarElement.src
    }
  }

  setUserInfo({name, about, avatar}) {
    this._userNameElement.textContent = name;
    this._userProfessionElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._userAvatarElement.alt = name + ", " + about;
  }
}