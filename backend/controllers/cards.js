const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getCard = (req, res) => {
  Card.findById(req.params._id)
    .then((card) => {
      return res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Данная карточка отсутствует' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => { res.send({ body: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректно введенные данные' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if ((card.owner._id).toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((trueCard) => {
            res.send({ data: trueCard });
          });
      } else {
        res.send({ message: 'Нет прав на удаление данной карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Данная карточка отсутствует' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Данная карточка отсутствует' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Данная карточка отсутствует' });
      } else {
        res.status(500).send({ message: 'Упс! У нас ошибка, разберемся!' });
      }
    });
};

module.exports = {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
};
