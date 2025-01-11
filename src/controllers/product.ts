import { Request, Response } from 'express';

const products: {title: string}[] = [];

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
    products.push({title});
    res.redirect('../');
}

const getProducts = (req: Request, res: Response, next: () => void) => {
    res.render('shop', {
        productsCSS: true,
        products : products, 
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