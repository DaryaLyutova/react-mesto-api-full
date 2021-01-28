class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _showErrow(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  sethUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  makeNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }
}

//создание экземпляра класса
const api = new Api({
  url: 'http://api.lutowa.darya.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;