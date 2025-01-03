"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
// import { engine } from 'express-handlebars';
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'pug'));
// HANDLEBARS
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname, 'hbs'));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'ejs'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use('/', (req, res, next) => {
    res.status(404).render('404', { pageTitle: '404', path: undefined });
});
app.listen(3000);
