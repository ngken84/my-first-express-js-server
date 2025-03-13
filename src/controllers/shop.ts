import { Request, Response } from 'express';

import Product from '../models/product';
import Cart from '../models/cart';

const getShopIndex = (req: Request, res: Response, next: () => void) => {
    res.render('shop/index', {
        pageTitle: "Shop",
        path: '/'
    });
}

const getCart = (req: Request, res: Response, next: () => void) => {

    Cart.getCartContents((cart) => {
        let ids : number[]= [];
        cart.products.forEach(element => {
            ids.push(element.productId);
        });
    })
    
}

const postCart = (req: Request, res: Response, next: () => void) => {
    const { id } = req.body;
    const numId = parseInt(id);

    
}

const postRemoveFromCart = (req: Request, res: Response, next: () => void) => {
    const { id } = req.body;
    const numId = parseInt(id);

    
}

const getOrders = (req: Request, res: Response, next: () => void) => {
    res.render('shop/orders', {
        pageTitle: "My Orders",
        path: '/orders'
    });
}

const getProductList = (req: Request, res: Response, next: () => void) => {
    
}

const getProduct = (req: Request, res: Response, next: () => void) => {
    const {productId} = req.params as { productId: string }
    const id = parseInt(productId);
    

}


const ShopController = {
    getProductList,
    getShopIndex,
    getOrders,
    getCart,
    postCart,
    postRemoveFromCart,
    getProduct
}

export default ShopController;