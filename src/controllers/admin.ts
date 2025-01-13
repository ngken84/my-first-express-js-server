import { Request, Response } from 'express';

import Product, { ProductInterface } from '../models/product';

const getAddProduct = (req: Request, res: Response, next: () => void) => {
    res.render('admin/add-product', {
        pageTitle: "ADMIN: Add Product",
        path: '/admin/add-product',
    });
}

const postAddProduct = (req: Request, res: Response, next: () => void) => {
    const { title, description, cost } = req.body as ProductInterface;
    const product = new Product(title, description, cost);
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
