const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "506ae529-0bc2-4a43-a253-986c9dc5ffe6", //"506ae529-0bc2-4a43-a253-986c9dc5ffe6"
    "Content-Type": "application/json",
  },
};

class Api {
  constructor({ baseUrl, headers }) { // config = {baseUrl, headers }
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  
  _resOk() {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(_resOk);
  }

  getInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(_resOk);
  }


}



const editDataProfile = (name, about) => {
  return resOk(
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
  );
};


const editAvatarProfile = (avatar) => {
  return resOk(
    fetch(`${config.baseUrl}/users/me/avatar`, {
      headers: config.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
  );
};

const addNewCard = (name, link) => {
  return resOk(
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  );
};

const deleteCard = (id) => {
  return resOk(
    fetch(`${config.baseUrl}/cards/${id}`, {
      headers: config.headers,
      method: "DELETE",
    })
  );
};
const likeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
  });
};
const deleteLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
  });
};

export {
  getInitialProfile,
  getInitialCards,
  editDataProfile,
  editAvatarProfile,
  addNewCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
  resOk,
};
