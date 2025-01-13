"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getShopIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: "Shop",
        path: '/'
    });
};
const getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: "My Cart",
        path: '/cart'
    });
};
const ShopController = {
    getShopIndex,
    getCart
};
exports.default = ShopController;
