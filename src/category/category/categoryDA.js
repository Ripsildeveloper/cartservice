'use strict';
var SuperCategory = require('../../model/superCategory.model');
var Product = require('../../model/product.model');
var appSetting = require('../../config/appSetting');

exports.showSuperCategory = function (req, res) {
  SuperCategory.find({}).select().exec(function (err, superCat) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      res.json(superCat);
    }
  });
}

exports.categoryProduct = function (req, res) {
  Product.find({mainCategory: req.params.id}).select().exec(function (err, productModel) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      var productLength = productModel.length - 1;
      for (var i = 0; i <= productLength; i++) {
        var productImages = productModel[i].productImageName.sort();
        var productImageLength = productImages.length - 1;
        for (var j = 0; j <= productImageLength; j++) {
          productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].skuCode + '/' + productModel[i].productImageName[j];
        }
      }
      res.json(productModel);
    }
  });
}
