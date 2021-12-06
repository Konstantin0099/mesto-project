export function renderLoading(element, text) {
  element.textContent = text;
}

export function processResponseProfileInfo(res, callBack, popup) {
  return res
    .then(userInfo => {
      callBack(userInfo);
      popup.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popup.saveBtn.textContent = 'Сохранить';
    });
}

