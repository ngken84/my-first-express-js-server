import { Request, Response } from 'express';

import Product from '../models/product';

const getAddProduct = (req: Request, res: Response, next: () => void) => {
    res.render('admin', {
        pageTitle: "ADMIN: Add Product",
        formCSS: true,
        path: '/admin/add-product',
        activeAddProd: true
    });
}

const postAddProduct = (req: Request, res: Response, next: () => void) => {
    const { title } = req.body as { title: string };
    const product = new Product(title);
    product.save();
    res.redirect('../');
}

const getProducts = (req: Request, res: Response, next: () => void) => {
    res.render('shop', {
        productsCSS: true,
        products : Product.fetchAll(), 
        pageTitle: "Shop",
        title: 'My little shop',
        activeShop: true,
        path: '/'
    });
}

const ProductsController = {
    getAddProduct,
    postAddProduct,
    getProducts
}

export default ProductsController;