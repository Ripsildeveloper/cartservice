var express = require('express'),
  app = express(),
  port = process.env.PORT || 3071, // port no
  bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var exec = require('child_process').exec;
var fs = require('fs');
var http = require('http');
var https = require('https');
const MongoStore = require('connect-mongo')(session);
var Cart = require('./model/cart.model');
var Product = require('./model/product.model');
var mongoose = require('mongoose');
var mongoDbConfig = require('./config/mongoDatabase.config');
var appSetting = require('./config/appSetting');

var routes = require('./route');

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));


app.use(cors());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: { httpOnly: true }
}));
routes.loadRoutes(app);
var httpServer = http.createServer(app);


httpServer.listen(port);






mongoose.connect(mongoDbConfig.url, {});

mongoose.connection.on('error', function () {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', function () {
  console.log("Successfully connected to the database");
})

app.get('/test/:id', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", "true");
  /* res.send("Success!"); */
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) {
      res.status(500).json({
        "result": 0
      })
    } else {
      var productImageLength = product.productImageName.length - 1;
      for (var j = 0; j <= productImageLength; j++) {
        product.productImageName[j] = appSetting.productServerPath + product.skuCode + '/' + product.productImageName[j];
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      res.status(200).json({
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
      });
    }
  });
});
app.get('/shopping', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", "true");
  if (!req.session.cart) {
    return res.status(200).json({
      products: null
    });
  } else {
    var cart = new Cart(req.session.cart);
    res.status(200).json({
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
      totalQty: cart.totalQty
    });
  }
});

app.get('/reduce/:id', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", "true");
  var productId = req.params.id;

  cart.reduceByOne(productId);
  req.session.cart = cart;
  req.session.user = user;
  res.status(200).json({
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
});


app.get('/remove/:id', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", "true");
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.status(200).json({
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
});


console.log('Arif Buyer Service started on: ' + port);
