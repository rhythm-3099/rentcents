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

<<<<<<< HEAD
/*app.get("/api/product/:productId", (req,res,next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
     // console.log(doc);
      res.status(200).json({
          message : "product fetched successfully",
          product : doc
      });
    })
    .catch(err => console.log(err));
})
*/
app.use("/api/product",productRoutes);
=======
app.use("/api/product",productRoutes);





>>>>>>> upstream/master
module.exports = app;
