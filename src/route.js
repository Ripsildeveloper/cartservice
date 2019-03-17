var settingRoutes = require('./settings/settingsRoute');
var productRoute = require('./product/productRoute');
var category = require('./category/categoryRoute');
var accountRoute = require('./account/accountRoute');
var cartRoute = require('./cart/cartRoute');
exports.loadRoutes = function (app) {
    settingRoutes(app);
    productRoute(app);
    category(app);
    accountRoute(app);
    cartRoute(app);
}