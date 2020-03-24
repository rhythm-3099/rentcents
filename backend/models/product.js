const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  description : { type: String, required:true },
  price : { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  main_category: { type: String, required: true },
  sub_category: { type: String},
  imagePath: { type: String, required: true},
  rating: { type: String },
  owner : { type: String }
});

module.exports =  mongoose.model('Product',productSchema);
