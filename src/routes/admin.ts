import express, { Request, Response } from 'express';

const router = express.Router();

router.use('/add-product', (req: Request, res: Response, next: () => void) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
});

router.post('/product', (req: Request, res: Response, next: () => void) => {
    const {title} = req.body;
    console.log(title);
    res.redirect('/');
});

export default router;
