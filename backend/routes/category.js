const express = require("express");
const multer = require('multer');

const Product = require("../models/product");

const router = express.Router();

// fetching vehicle category products
router.get("/vehicle", (req,res,next) => {
  console.log('req.query',req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let newCount;
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

// fetching realestate category products
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

// fetching electronics category products
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

// fetching sports category products
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

// fetching furniture category products
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

// fetching books category products
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

// fetching hobby category products
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

// fetching educational category products
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

// fetching clothing category products
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

// fetching others category products
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
