const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => { res.send({ body: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректно введенные данные' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const getMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
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
  getUsers, getUser, postUser, getMe, updateUser, updateAvatar,
};
