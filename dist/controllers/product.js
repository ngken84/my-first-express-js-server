"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAddProduct = exports.getAddProduct = exports.products = void 0;
exports.products = [];
const getAddProduct = (req, res, next) => {
    res.render('admin', {
        pageTitle: "ADMIN: Add Product",
        formCSS: true,
        path: '/admin/add-product',
        activeAddProd: true
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, next) => {
    const { title } = req.body;
    exports.products.push({ title });
    res.redirect('../');
};
exports.postAddProduct = postAddProduct;
