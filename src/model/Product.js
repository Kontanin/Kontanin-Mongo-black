const mongoose = require('mongoose');

const ProductShema = mongoose.Schema({
  ProductId: {
    type: String,
    unique: true,
  },
  Productname: {
    type: String,
    unique: true,
  },
  ProductDescription:{
    type: String
  },
  ProductStock: {
    type: Number,
  },
  status: {
    type: Number,
  },
  Modifytime:{
    type: String,
  }
  // ,
  // ProductImg:
  // {
  //     data: Buffer,
  //     contentType: String
  // }
});

module.exports = mongoose.model('Product', ProductShema);
