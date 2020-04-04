const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    User.findOne({email: req.body.email}).then(use => {
      if(use) {
        res.status(201).json({
          message: "User email already exists",
          result: null
        })
      }

      const user = new User({
        email: req.body.email,
        password: hash,
        userName: req.body.userName,
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
          // res.status(500).json({
          //   error: err
          // });
        });

    })
    // const user = new User({
    //   email: req.body.email,
    //   password: hash,
    //   userName: req.body.userName,
    //   number:req.body.number,
    //   address:req.body.address,
    //   rating: "0"
    // });
    // user
    //   .save()
    //   .then(result => {
    //     res.status(201).json({
    //       message: "User created!",
    //       result: result
    //     });
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       error: err
    //     });
    //   });
  });
});

// router.put("updateprofile", (req,res,next) => {
//   bcrypt.hash(req.body.password,10).then(hash => {

//   })
// })

router.post("/login", (req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {

      if(!user){
        //console.log('wrong useremail part');
        return res.status(201).json({
          token:null,
          userId: null,
          userName: null,
          expiresIn:null,
          userEmail:null,
          message: 'Mail wrong'
        });
      }
      fetchedUser = user;
      console.log('wehere i am supposed to be');
      return bcrypt.compare(req.body.password, user.password);
    })
    // .catch(error => {
    //   console.log('here???  ', error);

    //   res.json(error);
    // })

    // console.log('i am here', );
    // bcrypt.compare(req.body.password, fetchedUser.password)
    .then(result => {


      if(!result) {
        fetchedUser = null;
        return res.status(201).json({
          token:null,
          userId: null,
          userName: null,
          userEmail:null,
          expiresIn: null,
          message: 'Password wrong'
        });
      }

      //console.log(fetchedUser);
      // ****************************************
      // if(!fetchedUser.isVerified)
      //   return res.json();

      // ****************************************
       user_id = "" + fetchedUser._id;
       user_name = "" + fetchedUser.userName;
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        userId : user_id,
        userName : user_name,
        userEmail: fetchedUser.email,
        expiresIn: "3600",
        message: 'successfully logged in'
      });
      //console.log('fetcheduser' , fetchedUser);
      console.log('in the user route');
    })
    .catch(err => {
      //res.json(err);
    });
});

// router.get("/checkuser/:email", (req,res,next) => {
//   let em = req.params.email;
//   console.log('parasite');

//   console.log(User.findOne({email: em}).count());
// })

router.get("/:userEmail", (req,res,next) => {
  const email = req.params.userEmail;
  User.findOne({email: email})
  .exec()
  .then(doc => {
      //console.log(doc, "hii");
      res.status(200).json(doc);
    })
  //   .catch(err => console.log(err));
  // User.findOne({email: email}).toArray((err,user) => {
  //   if(err){
  //     console.log(err);
  //     return false;
  //   }
  //   res.json(user);
  // });
})

router.get("/", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users: documents
    });
  });
})

router.put("/updateuser/:id", (req,res,next) => {
  let id = req.params.id;
  console.log('the password is', req.body.password);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = {
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
      number:req.body.number,
      address:req.body.address,
      rating: "0"
    };
    console.log('you');

    User.findByIdAndUpdate({_id: id}, user,{new: true}).then(newuser => {
      console.log('hey')
      console.log('new user' , newuser);
      res.json(newuser);
    }).catch(err => {
      console.log(err);
      res.json(err);
    })
  }).catch(err => {
    console.log('the error is ', err);
  });
  console.log('body that is sent ', req.body);

  // User.findByIdAndUpdate({_id: id}, user,{new: true}).then(newuser => {
  //   console.log(newuser);
  //   res.json(newuser);
  // }).catch(err => {
  //   res.json(err);
  // })
})


module.exports = router;
