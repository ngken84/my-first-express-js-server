import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path'

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import rootDir from './helper/path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pug'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req : Request, res: Response, next: () => void) => {
    res.status(404).render('404');
});

app.listen(3000);