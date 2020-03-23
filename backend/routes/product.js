const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const Product = require("../models/product");

const router = express.Router();

router.post("/", (req,res,next) => {
  const post = new Product({
    _id: req.body._id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category
  });
  post.save().then(result => {
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully.',
      postId: result._id
    });
  });

});

//get all the products
router.use("/", (req,res,next) => {
  Product.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      });
    });
});

// get a product by its id
router.get("/:id", (req,res,next) => {
  Product.findById(req.params._id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

// delete a product by its id
router.delete("/:id",(req,res,next) => {
  Product.deleteOne({ _id: req.params._id }).then(result => {
    console.log('result');
    res.status(200).json({ message: 'Post deleted! '});
  });
});


module.exports = router;
