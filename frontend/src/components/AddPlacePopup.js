import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const nameRef = React.useRef('');
  const linkRef = React.useRef('');

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
    nameRef.current.value = '';
    linkRef.current.value = '';
  }

  const fieldsetAddCard = (
    <>
      <input type="text"
        placeholder="Название"
        className="popup__input popup__input_placename"
        id="placename-input"
        name="name"
        minLength="1"
        maxLength="30"
        ref={nameRef}
        required />
      <span className="popup__error" id="placename-input-error"></span>
      <input type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_link"
        id="email-input"
        name="link"
        ref={linkRef}
        required />
      <span className="popup__error" id="email-input-error"></span>
    </>
  )

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      onAddPlace={props.onAddPlace}>
      {fieldsetAddCard}
    </PopupWithForm>
  )
}

export default AddPlacePopup;