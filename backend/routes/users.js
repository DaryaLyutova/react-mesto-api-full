const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
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
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?\:\/\/w?w?w?(\w*([\.\-\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=])*)*\#?/),
  }),
}), updateAvatar);

module.exports = router;
