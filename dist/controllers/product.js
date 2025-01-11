"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [];
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
    products.push({ title });
    res.redirect('../');
};
const getProducts = (req, res, next) => {
    res.render('shop', {
        productsCSS: true,
        products: products,
        pageTitle: "Shop",
        title: 'My little shop',
        activeShop: true,
        path: '/'
    });
};
const ProductsController = {
    getAddProduct,
    postAddProduct,
    getProducts
};
exports.default = ProductsController;
