const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { validationResult } = require('express-validator');

// get only my carts
router.get('/my', async (req, res) => {
  try {
    const carts = await Cart.find({ createdBy: req.user.id });
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// add new cartItem
router.post('/add', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req);

  const { productId, qty, name, price, countInStock, imageUrl } = req.body;
  try {
    const newCart = new Cart({
      createdBy: req.user.id,
      productId,
      qty,
      name,
      price,
      countInStock,
      imageUrl,
    });
    const cart = await newCart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// delete cartItem
router.delete('/delete/:id', async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });
    await Cart.findByIdAndRemove(req.params.id);
    res.send('Cart Removed successfully');
  } catch (err) {
    console.errors(err.message).json('Server Error');
  }
});

module.exports = router;
