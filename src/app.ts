import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path'

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req : Request, res: Response, next: () => void) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);