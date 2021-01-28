const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CheckUrlJoi } = require('../utils/consts');

router.get('/cards', getCards);

router.get('/cards/:_id', getCard);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(CheckUrlJoi),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), deleteCard);

router.post('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), dislikeCard);

module.exports = router;
