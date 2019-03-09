'use strict';
var Product = require('../../model/product.model');
var appSetting = require('../../config/appSetting');

exports.getProduct = function (req, res) {

  Product.find({}).select().exec(function (err, productData) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      var productLength = productData.length - 1;
      for (var i = 0; i <= productLength; i++) {
        var productImages = productData[i].productImageName.sort();
        var productImageLength = productImages.length - 1;
        for (var j = 0; j <= productImageLength; j++) {
          productData[i].productImageName[j] = appSetting.productServerPath + productData[i].skuCode + '/' + productData[i].productImageName[j];
        }
      }
      res.status(200).json(productData);
    }
  });
}
