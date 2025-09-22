const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: { type: String, require: true },
  client: { type: String, require: true },
});

module.exports = mongoose.model('Product', productsSchema);
