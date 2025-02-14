import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path'
// import { engine } from 'express-handlebars';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

import ErrorController from './controllers/error';

import pool from './helper/database';

const app = express();

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'pug'));

// HANDLEBARS
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname, 'hbs'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ejs'));

pool.execute('SELECT * FROM products')
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', ErrorController.error404);

app.listen(3000);