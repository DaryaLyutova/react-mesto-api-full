const router = require('express').Router();
const {
  getUsers, getUser, updateUser, getMe, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:_id', getUser);

router.patch('/user/me', updateUser);

router.patch('/user/me/avatar', updateAvatar);

module.exports = router;
