"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_1 = __importDefault(require("../controllers/shop"));
const router = express_1.default.Router();
router.get('/', shop_1.default.getShopIndex);
router.get('/products', shop_1.default.getProductList);
router.get('/cart', shop_1.default.getCart);
router.get('/checkout', shop_1.default.getCart);
exports.default = router;
