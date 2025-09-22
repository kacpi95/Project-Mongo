// post.routes.js

const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
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

router.post('/products', (req, res) => {
  const { name, client } = req.body;

  req.db
    .collection('products')
    .insertOne({ name: name, client: client })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;

  req.db
    .collection('products')
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { name: name, client: client } }
    )
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete('/products/:id', (req, res) => {
  req.db
    .collection('products')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
