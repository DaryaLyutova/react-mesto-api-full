const router = require('express').Router();
const {
  getUsers, getUser, createUser, login, updateUser, getMe, updateAvatar,
} = require('../controles/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:_id', getUser);

router.post('/signup', createUser);

router.post('/signin', login);

router.patch('/user/me', updateUser);

router.patch('/user/me/avatar', updateAvatar);

module.exports = router;
