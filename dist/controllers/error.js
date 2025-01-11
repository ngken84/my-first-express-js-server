"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: '404', path: undefined });
};
const ErrorController = {
    error404
};
exports.default = ErrorController;
