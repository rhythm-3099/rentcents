const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");

const wishlistSchema = mongoose.Schema({
  person: { type: String},
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
