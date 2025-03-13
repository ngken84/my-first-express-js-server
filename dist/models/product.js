"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../helper/database"));
class Product extends sequelize_1.Model {
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
}
exports.default = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: database_1.default,
    tableName: 'products'
});
