const mongoose = require('mongoose');

const OrderShema = mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Order', OrderShema);
