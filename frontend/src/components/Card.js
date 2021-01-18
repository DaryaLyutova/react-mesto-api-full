import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onImageClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        onCardClick(card);
        onImageClick();
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        // onDeleteClick(card)
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