"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (req, res, next) => {
    res.render('admin', {
        pageTitle: "ADMIN: Add Product",
        formCSS: true,
        path: '/admin/add-product',
        activeAddProd: true
    });
};
const postAddProduct = (req, res, next) => {
    const { title } = req.body;
    const product = new product_1.default(title);
    product.save((err) => {
        res.redirect('../');
    });
};
const getProducts = (req, res, next) => {
    product_1.default.fetchAll((products) => {
        res.render('shop', {
            productsCSS: true,
            products: products,
            pageTitle: "Shop",
            title: 'My little shop',
            activeShop: true,
            path: '/'
        });
    });
};
const ProductsController = {
    getAddProduct,
    postAddProduct,
    getProducts
};
exports.default = ProductsController;
