const express = require("express");

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
    owner_id: req.body.userId,
    owner_name : req.body.userName,
    rating : "0"
  });
  console.log(product);
  product.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        "message" : "Product added Succesfully."
      });
    })
    .catch(err => console.log(err));


})



router.get("/:productId", (req,res,next) => {
  const id = req.params.productId;
  console.log(id);
  Product.findById(id)
  .exec()
  .then(doc => {
      console.log(doc);
      res.status(200).json({
          message : "product fetched successfully",
          product : doc
      });
    })
    .catch(err => console.log(err));
})

/*
app.post("/api/product", (req,res,next) => {
  const post = new Post({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully.'
  });
});
*/



router.get("/", (req,res,next) => {
  Product.find()
    .then(documents => {
     // console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      });
    });

});


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

/*router.route("/").get((req,res) => {
  Product.find((err,data) => {
    if(err)
      return next(err);
    else
      res.json(data);
  })
})
*/
module.exports = router;
