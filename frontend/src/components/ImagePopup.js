import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_photo ${props.isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__photo-container">
        <button type="button" className="popup__close-button popup__close-button_photo" onClick={props.onClose} />
        <div>
          <img alt={props.isOpen ? props.card.name : ''} src={props.isOpen ? props.card.link : ''} className="popup__image" />
          <figcaption className="popup__title-photo">{props.isOpen ? props.card.name : ''}</figcaption>
        </div>
      </figure>
    </div>
  )
}
export default ImagePopup;