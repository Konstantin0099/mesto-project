


export default class Api {
  constructor({ baseUrl, headers }) { 
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }


  getInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  editDataProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(this._checkResponse)
  }

  editAvatarProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      })
    }).then(this._checkResponse)
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(this._checkResponse)
  };

  deleteCard(id){
    fetch(`${this.baseUrl}/cards/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this._checkResponse)
  };
  likeCard(id){
    fetch(`${this.baseUrl}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    }).then(this._checkResponse)
  };

  deleteLikeCard(id){
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this._checkResponse)
  };

}