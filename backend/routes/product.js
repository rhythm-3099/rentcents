const express = require("express");
const multer = require('multer');

const Product = require("../models/product");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images"); //relative to the server.js file
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("/", multer({storage: storage}).single("image"), (req,res,next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Product({
    _id: req.body._id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category,
    imagePath:  url + "/images/" + req.file.filename,
    owner_id: req.body.userId,
    owner_name : req.body.userName,
    rating : "0"
  });

  post.save().then(result => {
    //console.log(post);
    res.status(201).json({
      message: 'Post added successfully.',
      post: {
        // id: result._id,
        // name: result.name,
        // price: result.price,
        // description: result.description,
        // city: result.city,
        // state:result.state,
        // main_category: result.main_category,
        // sub_category: result.sub_category,
        // imagePath: result.imagePath
        ...result,
        id: result._id
      }
    });
  });

});

// get a product by its id
router.get("/:id", (req,res,next) => {
  Product.findById(req.params.id)
  .exec()
  .then(doc => {
      console.log(doc);
      res.status(200).json({
          message : "product fetched successfully",
          product : doc
      });
    })
    .catch(err => console.log(err));
});


//get all the products
router.get("/", (req,res,next) => {
  console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Product.find();
  let fetchedPosts;
  if(currentPage && pageSize) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Product.count();
    }).then(count => {
      //console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.put('/:id', function(req,res) {
  let conditions = {_id: req.params.id};

  Product.update(conditions, req.body)
    .then(doc => {
      if(!doc) { return res.status(404).end(); }
      return res.status(200).json("Updated successfully");
    })
    .catch(err => next(err));
})

// router.put(
//   "/:id",
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename;
//     }
//     const post = new Product({
//       // _id: req.body.id,
//       // title: req.body.title,
//       // content: req.body.content,
//       // imagePath: imagePath
//       _id: req.body.id,
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       city: req.body.city,
//       state: req.body.state,
//       main_category: req.body.main_category,
//       sub_category: req.body.sub_category,
//       imagePath:  req.body.imagePath,
//       owner_id: req.body.userId,
//       owner_name : req.body.userName,
//       rating : req.body.rating,
//       comments: req.body.comments
//     });
//     console.log(post);
//     Product.updateOne({ _id: req.params.id }, post).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );

//get 'vehicle' categorized products
// router.get("/vehicle", (req,res,next) => {
//   console.log(req.query);
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const postQuery = Product.find();
//   let fetchedPosts;
//   if(currentPage && pageSize) {
//     postQuery
//       .skip(pageSize * (currentPage - 1))
//       .limit(pageSize);
//   }
//   postQuery
//     .then(documents => {
//       fetchedPosts = documents;
//       return Product.count();
//     }).then(count => {
//       //console.log(documents);
//       res.status(200).json({
//         message: 'Posts fetched',
//         posts: fetchedPosts,
//         maxPosts: count
//       });
//     });
// });


// delete a product by its id
router.delete("/:id",(req,res,next) => {
  Product.deleteOne({ _id: req.params._id }).then(result => {
    console.log('result');
    res.status(200).json({ message: 'Post deleted! '});
  });
});


module.exports = router;
