'use strict';

var productMgr = require('./productdetails/productMgr');
var addToCartMgr = require('./addToCart/addToCartMgr');

module.exports = function (app) {

  app.route('/product')
    .get(productMgr.getProduct);
  app.route('/add-to-cart/:id')
    .get(addToCartMgr.createCart);
  app.route('/findcart')
    .post(addToCartMgr.findCart);
}