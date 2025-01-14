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
    constructor(title, description, cost, imageUrl, id = 0) {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.imageUrl = imageUrl;
        if (id < 1) {
            this.id = Date.now();
        }
        else {
            this.id = id;
        }
        if (this.cost && this.cost.length > 0 && this.cost[0] !== '$') {
            this.cost = '$' + this.cost;
        }
    }
    validateTitle() {
        if (!this.title || this.title.length == 0) {
            return "Please enter a title.";
        }
    }
    validateDescription() {
        if (!this.description || this.description.length == 0) {
            return "Please enter a description.";
        }
    }
    validateCost() {
        if (!this.cost || this.cost.length == 0) {
            return "Please enter a cost.";
        }
        const regex = /^\$?(0|[1-9]\d*)(\.\d{1,2})?$/;
        if (!regex.test(this.cost)) {
            return "Please enter a valid cost.";
        }
    }
    validateImageUrl() {
        if (!this.imageUrl || this.imageUrl.length === 0) {
            return;
        }
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
        if (!regex.test(this.imageUrl)) {
            return "Please enter a valid URL";
        }
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
            array.push({
                title: this.title,
                description: this.description,
                cost: this.cost,
                imageUrl: this.imageUrl,
                id: this.id
            });
            fs.writeFile(Product.getFilePath(), JSON.stringify(array), 'utf8', (err) => {
                callback(err);
            });
        });
    }
    static fetchAll(callback) {
        Product.getProductJsonArrayFromFile((array) => {
            const prodArray = [];
            for (let prodJson of array) {
                let newProduct = new Product(prodJson.title, prodJson.description, prodJson.cost, prodJson.imageUrl, prodJson.id);
                prodArray.push(newProduct);
            }
            callback(prodArray);
        });
    }
}
exports.default = Product;
