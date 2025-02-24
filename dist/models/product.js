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
const database_1 = __importDefault(require("../helper/database"));
class Product {
    constructor(title, description, price, imageUrl, id = 0) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.id = id;
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
        if (this.price < 0) {
            return "Please enter a valid cost";
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
    get costFloat() {
        return this.price;
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
        if (this.id > 0) {
        }
        else {
            database_1.default.execute("INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)", [
                this.title,
                this.description,
                this.price,
                this.imageUrl
            ]).then(() => {
                callback(null);
            }).catch(err => {
                console.log(err);
                callback(err);
            });
        }
    }
    static fetchAll(callback) {
        const prodArray = [];
        database_1.default.execute("SELECT * from products")
            .then(([rows, fieldData]) => {
            const products = [];
            for (let data of rows) {
                products.push(new Product(data.title, data.description, data.price, data.imageUrl, data.id));
            }
            callback(products);
        });
    }
    static deleteById(id, callback) {
        database_1.default.execute("SELECT * from products WHERE id= ?", [id])
            .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                let data = rows[0];
                const deletedProduct = new Product(data.title, data.description, data.price, data.imageUrl, data.id);
                database_1.default.execute("DELETE FROM products WHERE id=?", [id])
                    .then((_ => {
                    callback(deletedProduct);
                }));
            }
            else {
                callback(undefined);
            }
        });
    }
    static fetchById(id, callback) {
        database_1.default.execute("SELECT * FROM products WHERE id=?", [id])
            .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                let data = rows[0];
                return callback(new Product(data.title, data.description, data.price, data.imageUrl, data.id));
            }
            return callback(undefined);
        });
    }
    static fetchMapByIds(ids, callback) {
        database_1.default.execute("SELECT * from products")
            .then(([rows, fieldData]) => {
            const list = rows.filter((p) => ids.includes(p.id));
            const map = new Map();
            for (let i = 0; i < list.length; ++i) {
                map.set(list[i].id, list[i]);
            }
            callback(map);
        });
    }
}
exports.default = Product;
