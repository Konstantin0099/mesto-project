const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
    headers: {
      authorization: '506ae529-0bc2-4a43-a253-986c9dc5ffe6',
      'Content-Type': 'application/json'
    }
  }

console.log("api start");
const resOk = (requestServer) =>{
    return requestServer.then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
}
const getInitialProfile = () => {
     return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
     })
  } 
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
  } 
  const editDataProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
           name: name,
           about: about
      })
    })
  }



export {getInitialProfile, getInitialCards, editDataProfile, resOk};