
const mongoose = require("mongoose");
// sample user schema
const CartSchema = new mongoose.Schema({
    product: [{
      id: String,
      productName: String,
      productDescription: String,
      productImageName: String,
      price: Number,
      qty: Number
    }],
    qty: { type: Number, default: 0},
    subTotal: { type: Number, default: 0},
    userId: String
});
module.exports =  mongoose.model('Cart', CartSchema);
