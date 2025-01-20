"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
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
        product_1.default.fetchMapByIds(ids, (productMap) => {
            let productList = [];
            cart.products.forEach((element) => {
                const item = productMap.get(element.productId);
                if (item) {
                    productList.push({
                        product: new product_1.default(item.title, item.description, item.cost, item.imageUrl, item.id),
                        count: element.count
                    });
                }
            });
            res.render('shop/cart', {
                pageTitle: "My Cart",
                path: '/cart',
                cart: productList,
                totalAmount: cart.totalCost
            });
        });
    });
};
const postCart = (req, res, next) => {
    const { id } = req.body;
    const numId = parseInt(id);
    product_1.default.fetchById(numId, (product) => {
        if (product) {
            cart_1.default.addProduct(product, (err) => {
                res.redirect('/cart');
            });
        }
        else {
            res.redirect('/cart');
        }
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
