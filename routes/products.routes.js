// post.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(random);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  const { name, client } = req.body;

  try {
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: name, client: client },
      { new: true }
    );
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
