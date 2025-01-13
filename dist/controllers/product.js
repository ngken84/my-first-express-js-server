"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
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
        res.render('shop/product-list', {
            products: products,
            pageTitle: "Product List",
            path: '/products'
        });
    });
};
const getAdminProductList = (req, res, next) => {
    res.render('admin/product-list', {
        pageTitle: "ADMIN: Product List",
        path: '/admin/product-list'
    });
};
const ProductsController = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getAdminProductList
};
exports.default = ProductsController;
