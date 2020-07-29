const express = require("express");
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');


const Payment = require("../models/payment");
const Product = require("../models/product");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWCh8QB5eBlKoxbRk90XKmOBB4mZ21wo0TM40Pbc3ESDa7FriE47qOeRMmXzCHNegW3xH4E6jsoHmyFx',
  'client_secret': 'EP8w5kBiOijFAkKzJknB4buc5ooVbrzpbRM4HfB8Drg_GRWsOEaI0UE9LfVhS1btVOeMgIf6WYQZXmXf'
});

const routers = express.Router();

routers.post('/pay', (req, res) => {
   console.log("paying");console.log(req.body);

  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/api/payment/success/"+req.body.price,
        "cancel_url": "http://localhost:3000/api/payment/cancel"
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
        "description": req.body.description
    }]
  };

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      console.log(error);
      res.send({url : 'you should have internet connection for payment',
          success: false});
      // throw error;
  } else {

      for(let i = 0;i < payment.links.length;i++){
        //console.log(payment.links[i].href);
        if(payment.links[i].rel == 'approval_url'){
           console.log("URL : " + payment.links[i].href);
          console.log(payment.links[i].href);
          res.send({url :payment.links[i].href,
                    success: true});
        }
      }
  }
});

});

routers.get('/success/:money', (req, res) => {
  let money_ = req.params.money;
   console.log(money_);
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
   console.log(req.query);
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
       console.log(JSON.stringify(payment));

       const pay = new Payment({
        id: payment.id,
        payer_email : payment.payer.payer_info.email,
        payer_firstName:payment.payer.payer_info.first_name,
        payer_lastName: payment.payer.payer_info.last_name,
        payerid: payment.payer.payer_info.payer_id,
        merchantid: payment.transactions[0].payee.merchant_id,
        merchantName: payment.transactions[0].payee.email,
        procuctName: payment.transactions[0].item_list.items[0].name,
        procuctQuantity: payment.transactions[0].item_list.items[0].sku,
        price:  payment.transactions[0].item_list.items[0].price,
        description: payment.transactions[0].description,
        fees : payment.transactions[0].related_resources[0].sale.transaction_fee.value,
        paymentMode : payment.transactions[0].related_resources[0].sale.payment_mode,
        time: payment.create_time,
        parentPaymentId : payment.transactions[0].related_resources[0].sale.parent_payment
      });

        console.log(pay);
        pay.save();
        res.redirect("http://localhost:4200/payment/" + payment.id);
    }
});
});

routers.get('/cancel', (req, res) => res.send('Cancelled'));

routers.get('/paymentDetails/:id',(req,res,next)=>{


  console.log(req.params.id);
  Payment.find({ id : req.params.id})
  .exec()
  .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => console.log(err));

});

module.exports = routers;
