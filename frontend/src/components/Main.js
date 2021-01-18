import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} type="button" alt="Фото пользователя" className="avatar" />
        <div className="avatar avatar__hover" onClick={props.onEditAvatar}></div>
        <div className="profile-info">
          <div className="profile-info__container">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <button type="button" className="edit-button" onClick={props.onEditProfile} />
          </div>
          <p className="profile-info__activity">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="places">{
        cards.map((card) => (
          <Card
            key={card._id}
            cards={props.cards}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
            onImageClick={props.onImageClick} />
        )
        )
      }
      </section>
    </main>
  )
}
export default Main;