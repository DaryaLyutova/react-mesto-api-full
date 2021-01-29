import React from 'react';
import { Route, Switch, Redirect, useHistory, } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import SubmitPopup from './SubmitPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from '../mestoAuth.js';
import InfoTooItip from "./InfoTooltip";
import okImage from '../images/popup/Union.svg';
import errorImage from '../images/popup/Union (1).svg';

function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  // функция авторизации
  function authorizeUser(email, password, message, resetForm) {
    mestoAuth.authorize(email, password).then((data) => {
      if (data) {
        resetForm();
        handeleLogin();
        history.push('/');
      } else {
        alert(message);
      }
    }).catch((err) => {
      alert(err);
    });
  }

  // функция регистрации
  function registerUser(email, password, resetForm) {
    mestoAuth.register(email, password).then((data) => {
      if (data) {
        resetForm();
        handleInfoTooltipOk();
        history.push('/sign-in');
      } else {
        handleInfoTooltipErr();
      }
    }).catch((err) => {
      alert(err);
    });
  }

  // проверка токена и данные email 
  function handeleLogin() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      mestoAuth.getToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.email)
            history.push('/');
          }
        }).catch((err) => {
          console.log(err);
          signOut();
        })
    } else signOut();
  }
  //сохранение токена для повторного входа
  React.useEffect(() => {
    handeleLogin();
  }, [loggedIn]);

  //функция удаления токена
  function signOut() {
    localStorage.removeItem('token');
    setUserEmail('');
    history.push('/sign-in');
  }

  //стэйты состояния попапов (открыт/закрыт)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isCardOpen, setIsCardOpen] = React.useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);

  //данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  //данные карточек
  const [cards, setCards] = React.useState([]);
  //стэйт карточки для удаления
  const [cardforDelete, setCardForDelete] = React.useState({});
  //данные для попапа регистрации
  const [tooltip, setTooltip] = React.useState({
    image: errorImage,
    subtitle: 'Что-то пошло не так! Попробуйте ещё раз.',
  });

  // обработчик для попапа успешной регистрации
  function handleInfoTooltipOk() {
    setIsInfoTooltip(!isInfoTooltip);
    setTooltip({
      image: okImage,
      subtitle: 'Вы успешно зарегистрировались!',
    });
  }
  // обработчик для попапа ошибки при регистрации
  function handleInfoTooltipErr() {
    setIsInfoTooltip(!isInfoTooltip);
    setTooltip({
      image: errorImage,
      subtitle: 'Что-то пошло не так! Попробуйте ещё раз.',
    });
  }

  // запрос и обработка данных пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        console.log(initialCards)
        setCurrentUser(userData);
        setCards(
          initialCards.map((item) => ({
            _id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner._id
          })))
      }).catch((err) => {
        alert(err);
      })
  }, []);

  // обработчик для попапа изменения информации о пользователе
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  // обработчик для попапа добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  // обработчик для попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  // обработчик для попапа увеличения изображения
  function handleCardClick() {
    setIsCardOpen(!isCardOpen);
  }
  // функция закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardOpen(false);
    setIsSubmitPopupOpen(false);
    setIsInfoTooltip(false);
  }
  // функция обаботки данных о пользователе
  function handleUpdateUser(data) {
    console.log(data);
    api.setUserInfo(data).then((dataInfo) => {
      console.log(dataInfo);
      setCurrentUser(dataInfo.user);
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    })
  }
  // функция обаботки данных аватара
  function handleUpdateAvatar(data) {
    api.sethUserAvatar(data).then((dataAvatar) => {
      setCurrentUser(dataAvatar.user);
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    })
  }
  // функция обаботки данных карточки
  function handeleAddPlace(data) {
    console.log(data);
    api.makeNewCard(data).then((newCard) => {
      console.log(newCard);
      // Обновляем стейт
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    });
  }
  // функция обаботки лайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    }).catch((err) => {
      alert(err);
    });
  }
  // обработчик для попапа подтверждения удаления
  function handeleDeleteClick(card) {
    setIsSubmitPopupOpen(!isSubmitPopupOpen);
    setCardForDelete(card);
  }
  // функция обаботки данных
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const deleteId = card._id;
      // // Формируем новый массив на основе имеющегося, удаляя из него карточку
      const newCards = cards.filter((card) => card._id !== deleteId);
      // // Обновляем стейт
      setCards(newCards);
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={userEmail} signOut={signOut} />
          <Switch>
            <Route path="/sign-up">
              <Register
                onRegistration={registerUser} />
            </Route>
            <Route path="/sign-in" >
              <Login onLogin={authorizeUser} />
            </Route>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={setSelectedCard}
              onImageClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handeleDeleteClick}
              cards={cards}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handeleAddPlace} />
          <SubmitPopup
            isOpen={isSubmitPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={cardforDelete} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isCardOpen} />
          < InfoTooItip
            image={tooltip.image}
            subtitle={tooltip.subtitle}
            isOpen={isInfoTooltip}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
