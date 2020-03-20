const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description : { type: String, required:true },
  price : { type: String, required: true },
  rating: { type: String },
  owner : { type: String }
});

module.exports =  mongoose.model('Product',productSchema);
