const mongoose = require("mongoose");
const products = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: String,
});
module.exports = mongoose.model("products", products);
