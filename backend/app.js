const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errorUrl');

app.post('/signup', createUser);
app.post('/signin', login);

// защита авторизацией
app.use(auth);
app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
// eslint-disable-next-line no-unused-vars
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
});

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
