import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onImageClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);

    // обработчик клика на изображение для открытие попапа
    function handleClick() {
        onCardClick(card);
        onImageClick();
    }
    // обработчик клика на лайк
    function handleLikeClick() {
        onCardLike(card);
    }
    // обработчик клика на корзину
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="place__container">
            <img alt={`изображение ${card.name}`} src={card.link}
                className="place__image" onClick={handleClick} />
            <button
                type="button"
                className={`place__delete ${isOwn ? 'place__delete_visible' : ''}`}
                onClick={handleDeleteClick} />
            <div className="place__group">
                <h2 className="place__title">{card.name}</h2>
                <form className="place__like-container">
                    <button
                        type="button"
                        className={`place__like ${isLiked ? 'place__like_active' : ''}`}
                        onClick={handleLikeClick} />
                    <p className="place__like-counter">{card.likes.length}</p>
                </form>
            </div>
        </div>
    )
}

export default Card;