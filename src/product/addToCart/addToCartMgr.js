'use strict';
var addToCartDA = require('./addToCartDA');

exports.createCart = function (req, res) {
  try {
    addToCartDA.createCart(req, res);
  } catch (error) {
    console.log(error);
  }
}

exports.findCart = function (req, res) {
  try {
    addToCartDA.findCart(req, res);
  } catch (error) {
    console.log(error);
  }
}
