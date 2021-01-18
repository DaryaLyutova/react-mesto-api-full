import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMassege] = React.useState('Что-то пошло не так!');

  function handelEmailChange(e) {
    setEmail(e.target.value)
  };

  function handelPassword(e) {
    setPassword(e.target.value)
  };

  function handelMessage() {
    setMassege('Что-то пошло не так!');
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setMassege('');
  }

  function handelSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handelMessage();
    props.onLogin(email, password, message, resetForm);
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign__form" onSubmit={handelSubmit}>
        <input className="sign__input" placeholder="Email" type="email" name="email"
          onChange={handelEmailChange}
          value={email}
          required />
        <input className="sign__input" placeholder="Пароль" type="password"
          name="password"
          onChange={handelPassword}
          value={password}
          required />
        <button type="submit" className="sign__button">Войти</button>
      </form>
    </div>
  )
}
export default Login;