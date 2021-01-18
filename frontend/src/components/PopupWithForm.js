import React from 'react';

function PopupWithForm(props) {
    return (
        <form className={`popup popup__${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
            name={props.name} onSubmit={props.onSubmit}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <fieldset className="popup__profile">
                    {props.children}
                </fieldset>
                <button type="submit" className="popup__button">{props.buttonTitle}</button>
            </div>
        </form>
    )
}
export default PopupWithForm;