"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("../helper/path"));
const router = express_1.default.Router();
exports.products = [];
router.use('/add-product', (req, res, next) => {
    res.sendFile(path_1.default.join(path_2.default, 'views', 'add-product.html'));
});
router.post('/product', (req, res, next) => {
    const { title } = req.body;
    exports.products.push({ title });
    res.redirect('../');
});
exports.default = router;
