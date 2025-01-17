import { Request, Response } from 'express';

import Product, { ProductInterface } from '../models/product';

const getAddProduct = (req: Request, res: Response, next: () => void) => {
    res.render('admin/add-product', {
        pageTitle: "ADMIN: Add Product",
        path: '/admin/add-product',
        product: new Product('', '', '', ''),
        descriptionError: undefined,
        titleError: undefined,
        imageError: undefined,
        costError: undefined
    });
}

const postAddProduct = (req: Request, res: Response, next: () => void) => {
    const { title, description, cost, imageUrl } = req.body as ProductInterface;
    const product = new Product(title, description, cost, imageUrl);

    const titleError = product.validateTitle();
    const descriptionError = product.validateDescription();
    const costError = product.validateCost();
    const imageError = product.validateImageUrl();

    if(titleError || descriptionError || costError) {
        return res.render('admin/add-product', {
            pageTitle: "ADMIN: Add Product",
            path: '/admin/add-product',
            product: product,
            descriptionError,
            titleError,
            costError,
            imageError
        });
    }

    product.save((err) => {
        res.redirect('../');
    });
    
}

const getAdminProductList = (req: Request, res: Response, next: () => void) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            pageTitle: "ADMIN: Product List",
            path: '/admin/product-list',
            products 
        });
    })
}

const getEditProduct = (req: Request, res: Response, next: () => void) => {
    const id = req.query.id;
    const numId = parseInt(id);
    if(numId && numId > 0) {
        Product.fetchById(numId, (product) => {
            if(!product) {
                return res.redirect('/admin/product-list');
            }
            res.render('admin/edit-product', {
                pageTitle: "ADMIN: Edit Product",
                path: '/admin/add-product',
                product: product,
                descriptionError: undefined,
                titleError: undefined,
                imageError: undefined,
                costError: undefined
            });
        });
    }
    
}

const deleteProduct= (req: Request, res: Response, next: () => void) => {
    const { productId } = req.params as {productId : string}
    const id = parseInt(productId);
    Product.deleteById(id, (product) => {
        res.redirect('/admin/product-list');
    })
}

const AdminController = {
    getAddProduct,
    postAddProduct,
    getAdminProductList,
    getEditProduct,
    deleteProduct
}

export default AdminController;
