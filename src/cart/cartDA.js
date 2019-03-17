'use strict';
var Cart = require('../model/cartModel.model');

exports.addCartData = function (req, res) {
    const user = req.body.user;
    const item = {
      product: req.body.items,
      quantity: req.body.items.mfdQty
    };
  
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              })
              .exec()
              .then(() => res.end());
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.end());
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(() => res.end());
        }
      });
};


exports.cartUser = function (req, res) {
        Cart.findOne({ user: req.params.id })
        .populate('items[0].product')
        .exec((err, cart) => {
          if (!cart) {
            return res.send(null);
          }
      
          res.send(cart);
        });
};
