/* eslint-disable quotes */
/* eslint-disable quote-props */
const router = require('express').Router();
const AllErrors = require('../errors/all-errors');

// eslint-disable-next-line arrow-body-style
router.get('/*', (req, res, next) => {
  next(new AllErrors({ 'message': "Запрашиваемый ресурс не найден" }, 404));
});

module.exports = router;
