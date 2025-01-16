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
        product: new product_1.default('', '', '', ''),
        descriptionError: undefined,
        titleError: undefined,
        imageError: undefined,
        costError: undefined
    });
};
const postAddProduct = (req, res, next) => {
    const { title, description, cost, imageUrl } = req.body;
    const product = new product_1.default(title, description, cost, imageUrl);
    const titleError = product.validateTitle();
    const descriptionError = product.validateDescription();
    const costError = product.validateCost();
    const imageError = product.validateImageUrl();
    if (titleError || descriptionError || costError) {
        return res.render('admin/add-product', {
            pageTitle: "ADMIN: Add Product",
            path: '/admin/add-product',
            product: product,
            descriptionError,
            titleError,
            costError,
            imageError
        });
    }
    product.save((err) => {
        res.redirect('../');
    });
};
const getAdminProductList = (req, res, next) => {
    product_1.default.fetchAll(products => {
        res.render('admin/product-list', {
            pageTitle: "ADMIN: Product List",
            path: '/admin/product-list',
            products
        });
    });
};
const getEditProduct = (req, res, next) => {
    const id = req.query.id;
    const numId = parseInt(id);
    if (numId && numId > 0) {
        product_1.default.fetchById(numId, (product) => {
            if (!product) {
                return res.redirect('/admin/product-list');
            }
            res.render('admin/edit-product', {
                pageTitle: "ADMIN: Edit Product",
                path: '/admin/add-product',
                product: product,
                descriptionError: undefined,
                titleError: undefined,
                imageError: undefined,
                costError: undefined
            });
        });
    }
};
const deleteProduct = (req, res, next) => {
    const id = req.body.id;
    product_1.default.deleteById(id, (product) => {
        if (product) {
            return res.send(product);
        }
        res.send("NOT FOUND");
    });
};
const AdminController = {
    getAddProduct,
    postAddProduct,
    getAdminProductList,
    getEditProduct,
    deleteProduct
};
exports.default = AdminController;
