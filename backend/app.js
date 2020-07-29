const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const paymenttRoutes = require("./routes/payment");
const categoryRoutes = require("./routes/category");
const wishlistRoutes = require("./routes/wishlist");
const extraRoutes = require("./routes/extra");
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
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});


app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/payment",paymenttRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/extra",extraRoutes);

module.exports = app;
