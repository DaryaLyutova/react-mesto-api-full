/* eslint-disable quotes */
/* eslint-disable quote-props */
const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

// eslint-disable-next-line arrow-body-style
router.get('/*', (req, res, next) => {
  next(new NotFoundError({ 'message': "Запрашиваемый ресурс не найден" }));
});

module.exports = router;
