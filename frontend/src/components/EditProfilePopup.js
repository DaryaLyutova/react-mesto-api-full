import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangedescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    const fieldsetInfo = (
        <>
            <input type="text"
                placeholder="Имя"
                className="popup__input popup__input_name"
                id="name-input"
                name="name"
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
                value={name}
                required />
            <span className="popup__error" id="name-input-error"></span>
            <input type="text"
                placeholder="О себе"
                className="popup__input popup__input_activity"
                id="activity-input"
                name="about"
                minLength="2"
                maxLength="200"
                onChange={handleChangedescription}
                value={description}
                required />
            <span className="popup__error" id="activity-input-error"></span>
        </>
    )

    return (
        <PopupWithForm
            name="info"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            {fieldsetInfo}
        </PopupWithForm>)
}

export default EditProfilePopup;
