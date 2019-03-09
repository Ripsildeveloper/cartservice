'use strict';
var Cart = require('../../model/cart.model');
var Product = require('../../model/product.model');

/* 
exports.createCart = function (req, res) {
  var Cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(req.parmas.id).select().exec(function (err, product) {
    if (err) {
      res.status(500).json({
        "result": 0
      })
    } else {
      cart.add(product, product.id);
      req.session.cart = Cart;
      res.redirect('/');
    }
  });
} */


exports.findCart = function (req, res) {
  Cart.find({}).select().exec(function (err, cart) {
    if (err) {
      res.status(500).json({
        "result": 0
      })
    } else {

      res.status(200).json(cart);
    }

  });
}