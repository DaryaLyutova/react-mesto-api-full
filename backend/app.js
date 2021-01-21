const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
