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
router.get('/product/:productId', shop_1.default.getProduct);
router.get('/cart', shop_1.default.getCart);
router.post('/cart', shop_1.default.postCart);
router.get('/orders', shop_1.default.getOrders);
router.get('/checkout', shop_1.default.getCart);
router.post('/removefromcart', shop_1.default.postRemoveFromCart);
exports.default = router;
