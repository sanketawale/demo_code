'use strict';

var page = module.superModule;

var server = require('server');

server.extend(page);

var URLUtils = require('dw/web/URLUtils');
server.append('AddProduct', function (req, res, next) {
    var productListHelper = require('*/cartridge/scripts/productList/productListHelpers');

    var isWishList = req.querystring.isWishList;
    var productId = req.form.pid;
    var buyNow = req.form.buyNow;
    if (!empty(isWishList)) {
        var list = productListHelper.removeItem(req.currentCustomer.raw, productId, { req: req, type: 10 });
        var viewData = res.getViewData();
        res.setViewData({redirectURL: 'redirect'});
    }

    if (!empty(buyNow)) {
        res.setViewData({redirectCart: URLUtils.https('Checkout-Login').toString()});
    }
    next();
});

module.exports = server.exports();