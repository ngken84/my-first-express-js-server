import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';
import { products } from '../controllers/product';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    console.log(products);
    res.render('shop', {
        productsCSS: true,
        products : products, 
        pageTitle: "Shop",
        title: 'My little shop',
        activeShop: true,
        path: '/'
    });
});

export default router;