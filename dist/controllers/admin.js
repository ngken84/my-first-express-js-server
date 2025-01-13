"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: "ADMIN: Add Product",
        path: '/admin/add-product',
    });
};
const postAddProduct = (req, res, next) => {
    const { title } = req.body;
    const product = new product_1.default(title);
    product.save((err) => {
        res.redirect('../');
    });
};
const getAdminProductList = (req, res, next) => {
    res.render('admin/product-list', {
        pageTitle: "ADMIN: Product List",
        path: '/admin/product-list'
    });
};
const AdminController = {
    getAddProduct,
    postAddProduct,
    getAdminProductList
};
exports.default = AdminController;
