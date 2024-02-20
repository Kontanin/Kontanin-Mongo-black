const mongoose = require('mongoose');

const ProductShema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    stock: {
      type: Number,
    },
    status: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['others', 'cat', 'dog', 'small pet', 'fish', 'bird'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Product', ProductShema);
