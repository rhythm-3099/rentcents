const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Product = require("../models/product");

const router = express.Router();

router.post("/", (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description : req.body.description,
    price : req.body.price,
    rating : 0
  });
  product.save()
    .then(resilt => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    "message" : "Product added Succesfully."
  });
})

router.get("/", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Products fetched successfully!",
      posts: documents
    });
  });
})

module.exports = router;
