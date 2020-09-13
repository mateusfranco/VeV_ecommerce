const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductDataSchema = new Schema({  
  id: {type: String, required: true},
  title: String,
  price: Number,
  description: String,
  images: String,
  quantity: Number,
}, {collection: 'Products'});

const Products = mongoose.model('ProductsData', ProductDataSchema);

module.exports = { Products };