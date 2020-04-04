const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  id: { type: String, required: true },
  payer_email : { type: String, required: true },
  payer_firstName : { type: String, required: true },
  payer_lastName : { type: String, required: true },
  payerid : { type: String, required: true },
  merchantid : { type: String, required: true },
  merchantName : { type: String, required: true },
  procuctName : { type: String, required: true },
  procuctQuantity : { type: String, required: true },
  price : { type: String, required: true },
  description : { type: String, required: true },
  fees : { type: String, required: true },
  paymentMode : { type: String, required: true },
  time : { type: String, required: true },
  parentPaymentId : { type: String, required: true }
});

module.exports = mongoose.model("Payment", paymentSchema);
