"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./admin");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.render('shop', {
        productsCSS: true,
        products: admin_1.products,
        pageTitle: "Shop",
        title: 'My little shop',
        activeShop: true,
        path: '/'
    });
});
exports.default = router;
