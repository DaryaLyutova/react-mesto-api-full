const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:_id', getCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/https?\:\/\/w?w?w?(\w*([\.\-\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=])*)*\#?/),
  }),
}), createCard);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
