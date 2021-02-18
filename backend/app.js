const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errorUrl');
const limiter = require('./utils/limiter');

const app = express();

const PORT = 3000;

// app.use(cors({ origin: 'http://lutowa.darya.students.nomoredomains.monster' }));
app.use(cors());
// защитим заголовки
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем логгер запросов
app.use(requestLogger);

//  apply to all requests
app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// защита авторизацией
app.use(auth);
app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
