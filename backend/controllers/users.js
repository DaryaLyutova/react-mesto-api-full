require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');

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
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch((err) => {
      // проверим на валидность
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const createUser = (req, res) => {
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
      res.send({ body: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректно введенные данные' });
      } else {
        if (err.name === 'MongoError') {
          res.send({ message: 'Пользователь с данным именем уже существует' });
        }
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res) => {
  return User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // вернём токен
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch(next);
  // .catch(() => {
  //   res.status(500).send({ message: 'На сервере произошла ошибка' });
  // });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректно введенные данные' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректно введенные данные' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

module.exports = {
  getUsers, getUser, createUser, login, getMe, updateUser, updateAvatar,
};
