const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      userName: req.body.name,
      number:req.body.number,
      address:req.body.address,
      rating: "0"
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {

      if(!user){
        return res.status(401).json({
          message: 'Auth failed 1'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      if(!result) {
        fetchedUser = null;
        return res.status(401).json({
          message: 'Auth failed 2'
        });
      }

      console.log(fetchedUser);
       user_id = "" + fetchedUser._id;
       user_name = "" + fetchedUser.userName;
       user_email = "" + fetchedUser.email;
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        userId : user_id,
        userName : user_name,
        userEmail : user_email,
        expiresIn: "3600"
      });
      console.log(fetchedUser);
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed 3'
      });
    });
});

router.get("/:productId", (req,res,next) => {
  const id = req.params.productId;
  console.log(id);
  User.findById(id)
  .exec()
  .then(doc => {
      console.log(doc, "hii");
      res.status(200).json({
          message : "product fetched successfully",
          product : doc
      });
    })
    .catch(err => console.log(err));
})

router.get("/", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users: documents
    });
  });
})


module.exports = router;
