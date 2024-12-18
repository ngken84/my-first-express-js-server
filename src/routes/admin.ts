import express, { Request, Response } from 'express';
import path from "path";

import rootDir from '../helper/path';

const router = express.Router();

export const products: {title: string}[] = [];

router.use('/add-product', (req: Request, res: Response, next: () => void) => {
    res.render('admin');
});

router.post('/product', (req: Request, res: Response, next: () => void) => {
    const { title } = req.body as { title: string };
    products.push({title});
    res.redirect('../');
});

export default router;
