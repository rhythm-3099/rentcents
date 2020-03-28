const express = require("express");
const multer = require('multer');

const Product = require("../models/product");

const router = express.Router();

router.get("/vehicle", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let newCount;
  // Product.find({ "main_category": { $eq: "Vehicles" } }).exec(function (err, results) {
  //   // var newCount = results.length;
  //   // console.log(newCount);

  // });
  const postQuery = Product.find({ "main_category": { $eq: "Vehicles" } });
  console.log('hiiiiiii');

  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  console.log('hiiiiiii');
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Vehicles" } });
    }).then(count => {
      console.log(count);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/realestate", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Real Estate" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Real Estate" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/electronics", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Electronics" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Electronics" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/sports", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Sports" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Sports" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/furniture", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Furniture" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Furniture" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/books", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Books" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Books" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/hobby", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Hobby" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Hobby" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/educational", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Educational" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Educational" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/clothing", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Clothing" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Clothing" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/others", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find({ "main_category": { $eq: "Other" } });
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count({ "main_category": { $eq: "Other" } });
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

module.exports = router;
