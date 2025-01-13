import { Request, Response } from 'express';

import Product from '../models/product';

const getAddProduct = (req: Request, res: Response, next: () => void) => {
    res.render('admin/add-product', {
        pageTitle: "ADMIN: Add Product",
        formCSS: true,
        path: '/admin/add-product',
        activeAddProd: true
    });
}

const postAddProduct = (req: Request, res: Response, next: () => void) => {
    const { title } = req.body as { title: string };
    const product = new Product(title);
    product.save((err) => {
        res.redirect('../');
    });
    
}

const getAdminProductList = (req: Request, res: Response, next: () => void) => {
    res.render('admin/product-list', {
        pageTitle: "ADMIN: Product List",
        path: '/admin/product-list'
    });
}

const AdminController = {
    getAddProduct,
    postAddProduct,
    getAdminProductList
}

export default AdminController;
