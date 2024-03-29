const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,

  },
role:{
  type: String,
  enum: ['customer', 'admin'],
  default: 'customer',
  required: true,
}
  ,
  status: {
    type: Number,
  },
  fristname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
  },
  coutry: {
    type: String,
  },

  zipcode: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  }
});
module.exports = mongoose.model('User', UserShema);
