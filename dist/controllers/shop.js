"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../models/cart"));
const getShopIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: "Shop",
        path: '/'
    });
};
const getCart = (req, res, next) => {
    cart_1.default.getCartContents((cart) => {
        let ids = [];
        cart.products.forEach(element => {
            ids.push(element.productId);
        });
    });
};
const postCart = (req, res, next) => {
    const { id } = req.body;
    const numId = parseInt(id);
};
const postRemoveFromCart = (req, res, next) => {
    const { id } = req.body;
    const numId = parseInt(id);
};
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "My Orders",
        path: '/orders'
    });
};
const getProductList = (req, res, next) => {
};
const getProduct = (req, res, next) => {
    const { productId } = req.params;
    const id = parseInt(productId);
};
const ShopController = {
    getProductList,
    getShopIndex,
    getOrders,
    getCart,
    postCart,
    postRemoveFromCart,
    getProduct
};
exports.default = ShopController;
