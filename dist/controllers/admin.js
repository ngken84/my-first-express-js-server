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
        product: { title: '', description: '', price: '', imageUrl: '' },
        descriptionError: undefined,
        titleError: undefined,
        imageError: undefined,
        costError: undefined
    });
};
const postAddProduct = async (req, res, next) => {
    const { title, description, price, imageUrl } = req.body;
    const newProduct = await product_1.default.create({
        title,
        description,
        imageUrl,
        price: 10.00
    });
    // const titleError = product.validateTitle();
    // const descriptionError = product.validateDescription();
    // const costError = product.validateCost();
    // const imageError = product.validateImageUrl();
    // if(titleError || descriptionError || costError || imageError) {
    //     return res.render('admin/add-product', {
    //         pageTitle: "ADMIN: Add Product",
    //         path: '/admin/add-product',
    //         product: product,
    //         descriptionError,
    //         titleError,
    //         costError,
    //         imageError
    //     });
    // }
    // product.save((err) => {
    //     res.redirect('/admin/product-list');
    // });
};
const getAdminProductList = (req, res, next) => {
};
const getEditProduct = (req, res, next) => {
    const id = req.params.productId;
    const numId = parseInt(id);
    if (numId && numId > 0) {
    }
};
const postEditProduct = (req, res, next) => {
    const { id, title, description, imageUrl, cost } = req.body;
    const numid = parseInt(id);
    // const product = new Product(title, description, cost, imageUrl, numid);
    // const titleError = product.validateTitle();
    // const descriptionError = product.validateDescription();
    // const costError = product.validateCost();
    // const imageError = product.validateImageUrl();
    // if(titleError || descriptionError || costError || imageError) {
    //     return res.render('admin/edit-product', {
    //         pageTitle: "ADMIN: Edit Product",
    //         path: '/admin/edit-product',
    //         product: product,
    //         descriptionError,
    //         titleError,
    //         costError,
    //         imageError
    //     });
    // }
    // Product.fetchById(numid, (pr) => {
    //     if(pr) {
    //         product.save((err) => {
    //             res.redirect("/admin/product-list");
    //         });
    //     }
    //     res.redirect("/admin/product-list");
    // });
};
const deleteProduct = (req, res, next) => {
    const { productId } = req.params;
    const id = parseInt(productId);
    // Product.deleteById(id, (product) => {
    //     res.redirect('/admin/product-list');
    // })
};
const AdminController = {
    getAddProduct,
    postAddProduct,
    getAdminProductList,
    getEditProduct,
    postEditProduct,
    deleteProduct
};
exports.default = AdminController;
