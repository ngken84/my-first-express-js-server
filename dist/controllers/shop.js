"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
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
const getProductList = (req, res, next) => {
    product_1.default.fetchAll((products) => {
        res.render('shop/product-list', {
            products: products,
            pageTitle: "Product List",
            path: '/products'
        });
    });
};
const ShopController = {
    getProductList,
    getShopIndex,
    getCart
};
exports.default = ShopController;
