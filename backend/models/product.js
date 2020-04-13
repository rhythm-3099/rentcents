const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description : { type: String, required:true },
  price : { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  main_category: { type: String, required: true },
  sub_category: { type: String},
  imagePath: { type: String, required: true},
  owner : { type: String },
  owner_name : { type: String },
  owner_email: { type: String},
  owner_id: { type: String },
  rating: { type: String },
  comments: [{ type: String }]
});

module.exports = mongoose.model("Product", productSchema);
