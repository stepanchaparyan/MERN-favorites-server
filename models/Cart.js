const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  qty: {
    type: String,
  },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
