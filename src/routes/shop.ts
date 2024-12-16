import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';
import { products } from './admin';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    res.render('shop', {products : products, title: 'My little shop'});
});

export default router;