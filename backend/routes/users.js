const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');
const {
  getUsers, getUser, updateUser, getMe, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:_id', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      } return helpers.message('Поле "image" должно быть валидным url-адресом');
    }),
  }),
}), updateAvatar);

module.exports = router;
