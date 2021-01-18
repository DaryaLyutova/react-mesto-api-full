import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handelEmailChange(e) {
    setEmail(e.target.value)
  };

  function handelPassword(e) {
    setPassword(e.target.value)
  };

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handelSubmit(e) {
    e.preventDefault();
    props.onRegistration(email, password, resetForm);
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form className="sign__form" onSubmit={handelSubmit}>
        <input placeholder="Email" className="sign__input" type="email"
          name="email"
          onChange={handelEmailChange}
          value={email}
          required />
        <input placeholder="Пароль" className="sign__input" type="password"
          name="password"
          onChange={handelPassword}
          value={password}
          required />
        <button type="submit"
          className="sign__button">Зарегистрироваться</button>
        <div className="sign__link-block">
          <p className="sign__subtitle">Уже зарегистрированы?</p>
          <Link to="sign-in" className="sign__link">Войти</Link>
        </div>
      </form>
    </div>
  )
}
export default Register;