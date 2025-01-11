import { Request, Response } from 'express';

export const products: {title: string}[] = [];

export const getAddProduct = (req: Request, res: Response, next: () => void) => {
    res.render('admin', {
        pageTitle: "ADMIN: Add Product",
        formCSS: true,
        path: '/admin/add-product',
        activeAddProd: true
    });
}

export const postAddProduct = (req: Request, res: Response, next: () => void) => {
    const { title } = req.body as { title: string };
    products.push({title});
    res.redirect('../');
}