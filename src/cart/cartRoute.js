'use strict';
var cartMgr = require('./cartMgr');


module.exports = function (app) {
    app.route('/cart/:userId')
        .put(cartMgr.addCartData);

     app.route('/cart/:userId')
        .get(cartMgr.cartUser);
  /*      
        app.route('/pwdChange/:emailId')
        .get(pwdChangeMgr.pwdChangeRequest);
        
    
    app.route('/pwdChange/reset')
        .post(pwdChangeMgr.pwdChangeReset);   */
}