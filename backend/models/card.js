const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const str = /https?\:\/\/w?w?w?(\w*([\.\-\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=])*)*\#?/gim;
        return str.test(v);
      },
      message: 'Некоррекные данные',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    // type: Array,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;
