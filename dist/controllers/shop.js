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
const postCart = (req, res, next) => {
    const { id } = req.body;
    console.log("cart", id);
    res.render('shop/cart', {
        pageTitle: "My Cart",
        path: '/cart'
    });
};
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "My Orders",
        path: '/orders'
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
const getProduct = (req, res, next) => {
    const { productId } = req.params;
    const id = parseInt(productId);
    product_1.default.fetchById(id, (product) => {
        if (product) {
            return res.render('shop/product', {
                product,
                pageTitle: product.title,
                path: '/products'
            });
        }
        res.redirect('/products');
    });
};
const ShopController = {
    getProductList,
    getShopIndex,
    getOrders,
    getCart,
    postCart,
    getProduct
};
exports.default = ShopController;
