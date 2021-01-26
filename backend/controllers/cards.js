const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');

const getCards = (req, res, next) => {
  Card.find({}).populate('owner')
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(next);
};

const getCard = (req, res, next) => {
  Card.findById(req.params._id).populate('owner')
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Данная карточка отсутствует');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Данная карточка отсутствует'));
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => { return res.send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if ((card.owner._id).toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then((trueCard) => {
            return res.send(trueCard);
          });
      }
      throw new NotFoundError('Нет прав на удаление данной карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Данная карточка отсутствует'));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { return res.send(card); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Данная карточка отсутствует'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { return res.send(card); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Данная карточка отсутствует'));
      }
      next(err);
    });
};

module.exports = {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
};
