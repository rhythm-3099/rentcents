const express = require("express");

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARnIB36gmVQVudXCSEvGUf_JNN35-jgG2F-bMYgwtnItSsVhRPGxqNL0bHediVCuGvvV_LgZwdVu1NCg',
  'client_secret': 'EKjXTh_U4R4C1YOR_mCzn9RdaDulT4W9exmGwEXYilCFND0e7_4Oz1il5BGnl3bpG82Iugvpm6yu653y'
});

const routers = express.Router();

routers.post('/pay', (req, res) => {
  // console.log("paying");

  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:4000/users/success/"+req.body.price,
        "cancel_url": "http://localhost:4000/users/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": req.body.name,
                "sku": "001",
                "price": req.body.price,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.body.price
        },
        "description": req.body.discription
    }]
  }

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      console.log(error);
      res.send({url : 'you should have internet connection for payment',
          success: false});
      // throw error;
  } else {

      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          // console.log("URL : " + payment.links[i].hrefs);
          console.log(payment.links[i].href);
          res.send({url :payment.links[i].href,
                    success: true});
        }
      }
  }
});

});

routers.get('/success/:money', (req, res) => {
  let money_ = req.param("money");
  // console.log(money_);
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  // console.log(req.query);
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": money_
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
      // console.log(JSON.stringify(payment));
      //res.send('Success');
     /* MongoClient.connect('mongodb://localhost:27017/renting_system', function(err, db) {
          var db1 = db.db('renting_system');
          let payment_ = db1.collection("payment");
          payment_.insertOne(payment , (err,res)=>{
              if(err){
                  console.log("Err " + err);
              }else {
                  console.log("REs " + res);
              }
          });
          var myquery = {
              // _id : new ObjectId(req.body.id),
              product_name : payment.transactions[0].item_list.items[0].name
          };
          var newvalues2 =  { $set: {payment : true} }
          db1.collection("product").updateOne(myquery,newvalues2,(err)=>{
                  if(err) throw err;
          });
          var newvalues3 =  { $set: {payment_type : true} }
          db1.collection("product").updateOne(myquery,newvalues3,(err)=>{
                  if(err) throw err;
          });
      });
      // console.log(payment.id);*/
      res.redirect("http://localhost:4200/payment/" + payment.id);
    }
});
});

routers.get('/cancel', (req, res) => res.send('Cancelled'));

routers.get('/paymentDetails/:id',(req,res,next)=>{
  // console.log("start");
  /*let id_ = req.param("id");
  // console.log(id_);
  MongoClient.connect('mongodb://localhost:27017/renting_system', function(err, db) {

      var users = null;
      assert.equal(err, null);
      var db1 = db.db('renting_system');
          var cursor = db1.collection('payment').find();
          cursor.forEach(
          function(doc) {
              // console.log(doc);
              if(doc.id == id_)
                  users = doc;
                  console.log(users);
           },
          function(err) {
              if(err) return err;
              db.close();
             res.json(users);
          }
      );
  });*/
});

module.exports = routers;
