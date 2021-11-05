// Токен: 506ae529-0bc2-4a43-a253-986c9dc5ffe6
// Идентификатор группы: plus-cohort-3

// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co

// 3. Загрузка информации о пользователе с сервера ..где cohortId номер группы
// GET https://nomoreparties.co/v1/cohortId/users/me 
// {    // вернется такой объект 
//     "name": "Jacques Cousteau",
//     "about": "Sailor, researcher",
//     "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
//     "_id": "e20537ed11237f86bbb20ccb",
//     "cohort": "cohort0"
//   } 

// src="<%=require('./../src/image/foto_kusto.png')%>"

// 4. Загрузка карточек с сервера
// GET https://nomoreparties.co/v1/cohortId/cards 
// [  // В ответ придёт JSON с массивом карточек, которые загрузили студенты вашей группы:
// У каждой карточки есть свойства name и link — это заголовок и ссылка на картинку — они понадобятся при отображении каждой отдельной карточки.
// Как видите, у карточки также есть идентификатор — свойство _id.
//     {
//       "likes": [],
//       "_id": "5d1f0611d321eb4bdcd707dd",
//       "name": "Байкал",
//       "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//       "owner": {
//         "name": "Jacques Cousteau",
//         "about": "Sailor, researcher",
//         "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
//         "_id": "ef5f7423f7f5e22bef4ad607",
//         "cohort": "local"
//       },
//       "createdAt": "2019-07-05T08:10:57.741Z"
//     },
//     {
//       "likes": [],
//       "_id": "5d1f064ed321eb4bdcd707de",
//       "name": "Архыз",
//       "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//       "owner": {
//         "name": "Jacques Cousteau",
//         "about": "Sailor, researcher",
//         "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
//         "_id": "ef5f7423f7f5e22bef4ad607",
//         "cohort": "local"
//       },
//       "createdAt": "2019-07-05T08:11:58.324Z"
//     }
//   ] 

// return fetch('https://nomoreparties.co/v1/plus-cohort-3/users/me', {
//   headers: {
//     authorization: '506ae529-0bc2-4a43-a253-986c9dc5ffe6'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 
