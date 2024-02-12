const mongoose = require('mongoose');

const OrderShema = mongoose.Schema({
  OrderId: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
  },
  StatusOrder: {
    type: String,
  },
  OrderList: {
    ProductId: {
      type: String,
    },
    NumberOfOrder: {
      type: Number,
    },
  },
});
module.exports = mongoose.model('Order', OrderShema);
