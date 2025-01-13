"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("../helper/path"));
class Product {
    constructor(title) {
        this.title = title;
    }
    static getFilePath() {
        return path_1.default.join(path_2.default, 'data', 'products.json');
    }
    static getProductJsonArrayFromFile(callback) {
        const p = Product.getFilePath();
        fs.readFile(p, 'utf8', (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            callback(products);
        });
    }
    save(callback) {
        Product.getProductJsonArrayFromFile((array) => {
            array.push({ title: this.title });
            fs.writeFile(Product.getFilePath(), JSON.stringify(array), 'utf8', (err) => {
                callback(err);
            });
        });
    }
    static fetchAll(callback) {
        Product.getProductJsonArrayFromFile((array) => {
            const prodArray = [];
            for (let prodJson of array) {
                let newProduct = new Product(prodJson.title);
                prodArray.push(newProduct);
            }
            callback(prodArray);
        });
    }
}
exports.default = Product;
