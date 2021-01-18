import React from 'react';

function InfoTooItip(props) {
    return (
        <div className={`popup popup__tooltip ${props.isOpen ? 'popup_opened' : ''}`} >
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose} />
                <img src={props.image} className="popup__info-image" alt="Знак подсказки" />
                <h2 className="popup__subtitle">{props.subtitle}</h2>
            </div>
        </div>
    )
}
export default InfoTooItip;