const mongoose = require('mongoose');

const ProductShema = mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    Description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    Stock: {
      type: Number,
    },
    Status: {
      type: Number,
    },
    Price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    Image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    FreeShipping: {
      type: Boolean,
      default: false,
    },
    Company: {
      type: String,
      required: [true, 'Please provide company'],
    },
    Category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['others', 'cat', 'dog', 'small pet', 'fish', 'bird'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Product', ProductShema);
