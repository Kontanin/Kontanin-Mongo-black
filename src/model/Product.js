const mongoose=require('mongoose')

const ProductShema=mongoose.Schema({
  ProductId:{
    type: String,
    unique: true,
  },
  Productname:{
    type: String,
    unique: true,
  },
  ProductStock:{
    type: Number
  },
  ProductImg:
  {
      data: Buffer,
      contentType: String
  }

})