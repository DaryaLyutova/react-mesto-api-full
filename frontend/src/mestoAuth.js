export const BASE_URL = 'https://auth.nomoreparties.co';

// запрос на регистрацию пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      try {
        if (response.status === 201) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
// запрос на авторизацию пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => { return res.json() })
    .then((data) => {
      if (data.token) {
        // сохранение токена в localStorage
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
};
// запрос на поллучение токена 
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => { return res.json() })
    .then(data => data)
    .catch((err) => console.log(err));
}
