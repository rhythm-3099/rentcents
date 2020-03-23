const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const Product = require("../models/product");

const router = express.Router();

router.post("/", (req, res, next) => {

  console.log('product creating:)');

  const product = new Product({
    name: req.body.name,
    description : req.body.description,
    price : req.body.price,
    city : req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category,
    owner: req.body.userId,
    rating : 0
  });
  console.log(product);

  // city: { type: String, required: true },
  // state: { type: String, required: true },
  // main_category: { type: String, required: true },
  // sub_category: { type: String, required: true },
  product.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        "message" : "Product added Succesfully."
      });
    })
    .catch(err => console.log(err));


})

// router.get("/", (req, res, next) => {
//   Product.find().then(documents => {
//     res.status(200).json({
//       message: "Products fetched successfully!",
//       posts: documents
//     });
//   });
// })

// // Get all student
// studentRoute.route('/').get((req, res) => {
//   Student.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

router.route("/").get((req,res) => {
  Product.find((err,data) => {
    if(err)
      return next(err);
    else
      res.json(data);
  })
})

module.exports = router;
