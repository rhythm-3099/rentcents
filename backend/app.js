const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const Post = require('../backend/models/product');

const app = express();

mongoose
  .connect(
    "mongodb+srv://rhythm1:rhythm1@test-cphts.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/user", userRoutes);

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




//app.use("/api/product", productRoutes);
app.use("/api/product", (req,res,next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      });
    });

});
module.exports = app;
