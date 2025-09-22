const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(random);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postProduct = async (req, res) => {
  const { name, client } = req.body;

  try {
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putProductId = async (req, res) => {
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
};

exports.deleteProdcut = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
