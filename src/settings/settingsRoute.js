'use strict';
var adsMgr  = require('./ads/adsMgr');
var bannersMgr = require('./banner/bannerMgr');
var promotionsMgr = require('./promotions/promotionsMgr');
var headerMgr = require('./header/headerMgr');
var footerMgr = require('./footer/footerMgr');

module.exports = function(app) {
    app.route('/ads')
    .get(adsMgr.getAds);
    app.route('/banners')
    .get(bannersMgr.getBanners);
    app.route('/promotions')
    .get(promotionsMgr.getPromotions);

    // header 
    app.route('/headerDetails')
    .get(headerMgr.getHeaderDetails);

    // footer
    app.route('/footerDetails')
    .get(footerMgr.getFooterDetails);

    
}