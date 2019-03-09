var settingRoutes = require('./settings/settingsRoute');
var productRoute = require('./product/productRoute');
var category = require('./category/categoryRoute');
exports.loadRoutes = function (app) {
    settingRoutes(app);
    productRoute(app);
    category(app);
}