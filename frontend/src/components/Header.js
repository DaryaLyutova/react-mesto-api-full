import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo/logo.svg';

function Header(props) {
  //ссылка в header
  const [headerLink, setHeaderLink] = React.useState({
    title: 'Загеристрироваться',
    link: 'sign-up'
  });

  const location = useLocation();

  function handelHeaderTitle() {
    if (location.pathname === '/sign-in') {
      setHeaderLink({
        title: 'Загеристрироваться',
        link: 'sign-up'
      });
    } else {
      if (location.pathname === '/sign-up') {
        setHeaderLink({
          title: 'Войти',
          link: 'sign-in'
        });
      } else {
        setHeaderLink({
          title: 'Выйти',
          link: 'sign-in'
        });
      }
    }
  }

  React.useEffect(() => {
    handelHeaderTitle();
  }, [location.pathname])

  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="logo" />
      <div className="header__info">
        <p className="header__email">{props.email}</p>
        <Link
          to={headerLink.link}
          className="header__link"
          onClick={headerLink.title === 'Выйти' ? props.signOut : null}
        >{headerLink.title}</Link>
      </div>

    </header>
  )
}
export default Header;