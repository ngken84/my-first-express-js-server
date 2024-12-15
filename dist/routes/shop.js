"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("../helper/path"));
const admin_1 = require("./admin");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    console.log(admin_1.products);
    res.sendFile(path_1.default.join(path_2.default, "views", "shop.html"));
});
exports.default = router;
