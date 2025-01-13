"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.products = void 0;
exports.products = [];
class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        exports.products.push(this);
    }
}
exports.Product = Product;
