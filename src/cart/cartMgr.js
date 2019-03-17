'use strict';
var cartDA = require('./cartDA');
exports.addCartData = function (req, res) {
    cartDA.addCartData(req, res);
};

exports.cartUser = function (req, res) {
    cartDA.cartUser(req, res);
};
