const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  status: {
    type: Number,
  },
  123: {
    type: Number,
  },
});
module.exports = mongoose.model('User', UserShema);
