import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';
import { products } from './admin';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    res.render('shop', {
        productsCSS: true,
        products : products, 
        title: 'My little shop',
        activeShop: true,
        path: '/'
    });
});

export default router;