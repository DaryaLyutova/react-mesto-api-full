const Card = require('../models/card');
const AllErrors = require('../errors/all-errors');

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
      throw new AllErrors('Данная карточка отсутствует', 404);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors('Данная карточка отсутствует', 404));
      }
      return next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => { return res.send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AllErrors('Переданы некорректные данные', 400));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new AllErrors('Данная карточка отсутствует', 404))
    .then((card) => {
      if ((card.owner._id).toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then((trueCard) => {
            return res.send(trueCard);
          });
      }
      throw new AllErrors('Нет прав на удаление данной карточки', 403);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors('Невалидный id', 400));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new AllErrors('Данная карточка отсутствует', 404))
    .then((card) => {
      Card.findByIdAndUpdate(
        card._id,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => { return res.send(newCard); })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new AllErrors('Данная карточка отсутствует', 404));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors('Невалидный id', 400));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new AllErrors('Данная карточка отсутствует', 404))
    .then((card) => {
      Card.findByIdAndUpdate(
        card._id,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => { return res.send(newCard); })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new AllErrors('Данная карточка отсутствует', 404));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors('Невалидный id', 400));
      }
      return next(err);
    });
};

module.exports = {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
};
