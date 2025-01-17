import { Request, Response } from 'express';

import Product from '../models/product';

const getShopIndex = (req: Request, res: Response, next: () => void) => {
    res.render('shop/index', {
        pageTitle: "Shop",
        path: '/'
    });
}

const getCart = (req: Request, res: Response, next: () => void) => {
    res.render('shop/cart', {
        pageTitle: "My Cart",
        path: '/cart'
    });
}

const getOrders = (req: Request, res: Response, next: () => void) => {
    res.render('shop/orders', {
        pageTitle: "My Orders",
        path: '/orders'
    });
}

const getProductList = (req: Request, res: Response, next: () => void) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            products : products, 
            pageTitle: "Product List",
            path: '/products'
        });
    })
}

const getProduct = (req: Request, res: Response, next: () => void) => {
    const {productId} = req.params as { productId: string }
    const id = parseInt(productId);
    Product.fetchById(id, (product) => {
        if(product) {
            return res.render('shop/product', {
                product,
                pageTitle: product.title,
                path: '/products'
            })
        } 
        res.redirect('/products');
    })

}


const ShopController = {
    getProductList,
    getShopIndex,
    getOrders,
    getCart,
    getProduct
}

export default ShopController;