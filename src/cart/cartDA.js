'use strict';
var Cart = require('../model/cartModel.model');

exports.addCartData = function (req, res) {
  Cart.findOneAndUpdate({
      userId: req.params.userId
    }, {
      $push: {
        product: req.body.product
      }
    },
    function (err, cart) {
      if (err) { // if it contains error return 0
        res.status(500).send({
          "result": 0
        });
      } else {
        if (!cart) {
          var cart = new Cart()
          cart.userId = req.params.userId;
          cart.product = req.body.product;
          cart.save(function (err, newCart) {
            if (err) {
              res.status(201).send({
                "result": 0
              });
            } else {
              console.log(newCart);
            }
          })
        }
      }
    })
};


exports.cartUser = function (req, res) {
  Cart.aggregate([{
      "$unwind": "$product"
    },
    {
      "$match": {
        "userId": req.params.userId
      }
    },
    {
      $group: {
        _id: {
          id: "$product.id",
          productDescription: "$product.productDescription",
          productImageName: "$product.productImageName"
        },
        sumQty: {
          $sum: '$product.qty'
        },
        sumPrice: {"$sum" : {
          "$multiply": ["$product.price", "$product.qty"]
        }
      }},
    }
  ], function (err, data) {
    console.log(data);
  })
};
