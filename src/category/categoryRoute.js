'use strict';
var categoryMgr = require('./category/categoryMgr');

module.exports = function (app) {
  // super category
  app.route('/categoryDetails')
    .get(categoryMgr.showSuperCategory);

  // main category
  app.route('/categoryDetails/:id')
    .get(categoryMgr.categoryProduct);

}
