import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    const fieldsetAvatar = (
        <>
            <input type="url"
                placeholder="Ссылка на аватар"
                className="popup__input popup__input_avatar-link"
                id="avatar-input"
                name="avatar"
                ref={avatarRef}
                required />
            <span className="popup__error" id="avatar-input-error"></span>
        </>
    )

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonTitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onUpdateAvatar={props.onUpdateAvatar}
        >{fieldsetAvatar}</PopupWithForm>
    )
}

export default EditAvatarPopup;