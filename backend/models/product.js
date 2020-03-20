const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description : { type: String },
  price : { type: BigInt, required: true },
  rating: { type: Int8Array }
});

module.exports =  mongoose.model('Product',productSchema);
