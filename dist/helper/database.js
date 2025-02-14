"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const getPool = () => {
    return mysql2_1.default.createPool({
        host: 'localhost',
        user: 'root',
        password: 'testpassword',
        database: 'node-complete'
    });
};
const pool = getPool();
exports.default = pool.promise();
