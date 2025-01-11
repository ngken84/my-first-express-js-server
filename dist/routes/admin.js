"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../controllers/product"));
const router = express_1.default.Router();
router.use('/add-product', product_1.default.getAddProduct);
router.post('/product', product_1.default.postAddProduct);
exports.default = router;
