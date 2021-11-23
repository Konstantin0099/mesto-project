export default class Api {
  constructor({ baseUrl, headers }) { // config = {baseUrl, headers }
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  
  _checkResponse() {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(_checkResponse);
  }

  getInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(_checkResponse);
  }

  editDataProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(_checkResponse)
  }

  editAvatarProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      })
    }).then(_checkResponse)
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(_checkResponse)
  };

  deleteCard(id){
    fetch(`${this.baseUrl}/cards/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(_checkResponse)
  };
  likeCard(id){
    fetch(`${this.baseUrl}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    }).then(_checkResponse)
  };

  deleteLikeCard(id){
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(_checkResponse)
  };

}