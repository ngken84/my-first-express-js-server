"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controllers/admin"));
const router = express_1.default.Router();
router.get('/add-product', admin_1.default.getAddProduct);
router.post('/add-product', admin_1.default.postAddProduct);
router.get('/product-list', admin_1.default.getAdminProductList);
router.get('/edit-product', admin_1.default.getEditProduct);
router.post('/delete-product/:productId', admin_1.default.deleteProduct);
exports.default = router;
