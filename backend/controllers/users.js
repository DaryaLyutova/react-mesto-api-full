require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AllErrors = require('../errors/all-errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (user) {
        res.send({ user });
      }
      // если такого пользователя нет,
      // сгенерируем исключение
      throw new AllErrors('Нет пользователя с таким id', 404);
    })
    .catch((err) => {
      // проверим на валидность
      if (err.kind === 'ObjectId') {
        next(new AllErrors('Переданы некорректные данные', 400));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      });
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AllErrors('Переданы некорректные данные', 400));
      }
      if (err.name === 'MongoError') {
        next(new AllErrors('Пользователь с данным именем уже существует', 409));
      }
      return next(err);
    });
};

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  return User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new AllErrors('Неверный логин или пароль', 401));
      }
      return next(err);
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ user }); })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AllErrors('Переданы некорректные данные', 400));
      } else {
        if (err.name === 'CastError') {
          next(new AllErrors('Невалидный id', 400));
        }
        return next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AllErrors('Переданы некорректные данные', 400));
      }
      return next(err);
    });
};

module.exports = {
  getUsers, getUser, createUser, login, getMe, updateUser, updateAvatar,
};
