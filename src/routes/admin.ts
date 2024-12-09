import express, { Request, Response } from 'express';
import path from "path";

const router = express.Router();

router.use('/add-product', (req: Request, res: Response, next: () => void) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/product', (req: Request, res: Response, next: () => void) => {
    const {title} = req.body;
    console.log(title);
    res.redirect('../');
});

export default router;
