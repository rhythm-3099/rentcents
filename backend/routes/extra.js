const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlist");

router.get("/:id", (req,res,next) => {
  // Wishlist.findOne({person.id: }).
  //   populate('person')
  //   .populate('products')
  //   .then(wishlist => {
  //   res.status(200).json({
  //     message: 'wishlist fetched successfully',
  //     wishlist: wishlist
  //   });
  // });

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
