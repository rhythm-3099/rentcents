const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlist");

router.get("/", (req,res,next) => {
  Wishlist.find({})
    .populate('products')
    .then(docs => {
      docs.products = docs.products.f
      res.status(200).json({
        message: 'Fetched successfully :)',
        docs: docs
      });
    });
});

router.get("/:id", (req,res,next) => {
  Wishlist.findOne({person: req.params.id})
    .then(docs => {
      if(docs){
        res.status(200).json({
          message: 'fetched successfully',
          docs: docs.products
        });
      } else {
        res.status(200).json({
          message: 'no products in the wishlist',
          docs: null
        });
      }
    });

});

router.put('/:id', function(req,res) {
  console.log("req.body.products ", req.body);
  dataToBeUpdated = {
    userId: req.params.id,
    products: req.body
  }
  Wishlist.findOneAndUpdate({person: req.params.id}, {products: req.body}, {upsert: true, new: true})
    .then(doc => {
      console.log('ajsdjajsdlk ', doc);

      if(!doc) {
        return res.status(404).end();
      }
      console.log('hereheheh');
      return res.status(200).json({
        message: "Wishlist Updated successfully",
        doc: doc
      });
    })
    .catch(err => {
      console.log('Hello');
      return res.status(200).json({
        message: err,
        doc: null
      });
    });
});

router.get("/expanded/:id", (req,res,next) => {
  Wishlist.findOne({person: req.params.id})
    .populate('products')
    .then(docs => {
      if(docs){
        res.status(200).json({
          message: 'fetched successfully',
          docs: docs.products
        });
      } else {
        res.status(200).json({
          message: 'no products in the wishlist',
          docs: null
        });
      }
    });
});


module.exports = router;
