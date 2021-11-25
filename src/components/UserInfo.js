
// Класс UserInfo 
// отвечает за управление информацией о пользователе на странице. Этот класс:
// * 		Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// * 		Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
//          Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo.
//          Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// * 		Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

export default class UserInfo {
    constructor(selectorName, selectorProfession, selectorAvatar) { // card = { nameMesto, imageUrl, likes, _id,}
      this._selectorName = selectorName;
      this._selectorProfession = selectorProfession;
      this._selectorAvatar = selectorAvatar;
    }
    // Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
    getUserInfo(){
        return UserInfo
    }
    // который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    setUserInfo(user){

      this.initUserInfo(user)  // и добавляет их на страницу.
    }

    initUserInfo(user){
      this._selectorName.textContent = user.name;
      this._selectorProfession.textContent = user.about;
      this._selectorAvatar.src = user.avatar;
      this._selectorAvatar.alt = user.name + ", " + user.about;
    }


}
/// конец class UserInfo