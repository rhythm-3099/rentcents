const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require("../models/user");
const Token = require("../models/token");

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
      // user
      //   .save()
      //   .then(result => { // .randomBytes(16).toString('hex')
      //     var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      //     token.save(function(err) {
      //       if(err)
      //         return res.status(500).send({ msg: err.message });
      //        // Send the email
      //        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'rentscents@gmail.com', pass: '@Rhythm3099#' } });
      //        var mailOptions = { from: 'rentscents@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
      //        transporter.sendMail(mailOptions, function (err) {
      //            if (err) { return res.status(500).send({ msg: err.message }); }
      //            res.status(200).send('A verification email has been sent to ' + user.email + '.');
      //        });
      //     })
      //     res.status(201).json({
      //       message: "User created!",
      //       result: result
      //     });
      //   })
      //   .catch(err => {
      //     // res.status(500).json({
      //     //   error: err
      //     // });
      //   });
      //console.log('still here?');

      user.save(function (err) {
        if (err) { return res.status(201).json({ message: err.message }); }

        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(201).json({ message: err.message }); }
            //console.log('here? 1');

            // Send the email
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'rentscents@gmail.com',
                pass: '#Rhythm3099#'
              }
            });

            var mailOptions = { from: 'rentscents@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/user/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(201).send({ message: err.message }); }
                //console.log('here? 2');
                res.status(200).json({ message: 'mail sent'});
            });
        });
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

      if(!user.isVerified) {  // email verification not done
        return res.status(201).json({
          token:null,
          userId: null,
          userName: null,
          expiresIn:null,
          userEmail:null,
          message: 'Not verified'
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
       user_email = "" + fetchedUser.email;
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        userId : user_id,
        userName : user_name,
        userEmail : user_email,
        expiresIn: "3600",
        message : "successfully logged in"
      });
      console.log('fetcheduser' , fetchedUser);
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

router.post("/sendemail", (req,res,next) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rentscents@gmail.com',
      pass: '#Rhythm3099#'
    }
  });

  let mailText = req.body.text;
  let receiver_email = req.body.receiver_email;
  let sender_email = req.body.sender_email;
  let product_name = req.body.product_name;
  let mailing_list = receiver_email + ', ' + sender_email;
  console.log('mailing list ', mailing_list);
  let subject = "An enquiry on " + product_name;
  let body = "From " + sender_email + " : " + mailText;
  console.log('1 email text', mailText);
    console.log('1 receiver email', receiver_email);
    console.log('1 sender email', sender_email);

  let mailOptions = {
    from: 'rentscents@gmail.com',
    to: mailing_list,
    subject: subject,
    text: body
  }

  transporter.sendMail(mailOptions, function(err, data) {
    if(err){
      console.log('Error sending the mail: ', err);
      res.status(200).json({
        message: 'Error'
      })
    } else {
      console.log("Email sent successully!!");
      res.status(200).json({
        message: 'Sent mail'
      })
    }
  })
})

router.get("/confirmation/:token", (req,res,next) => {
  Token.findOne({token: req.params.token}, function(err, token){
    if (!token) return res.status(200).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user) return res.status(200).send({ message: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(200).send({ message: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
          if (err) { return res.status(200).send({ message: err.message }); }
          res.status(200).json({message: "The account has been verified. Please log in." });
      });
  });
  })
});
module.exports = router;
