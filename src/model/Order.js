const mongoose = require('mongoose');

const OrderShema = mongoose.Schema({
  id:{
    type: String,
    unique: true
}
  ,
  email: {
    type: String,
    unique: true,
  },
  statusOrder: {
    type: String,

  },
  orderlist:{
    productId:   {
      type: String
    },
    NumberOfOrder:{
      type: Number
    }
  }

}
);
