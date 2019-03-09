'use strict';
var productDA = require('./productDA');

exports.getProduct = function (req, res) {
    try {
        productDA.getProduct(req, res);
    } catch (error) {
        console.log(error);
    }
}
