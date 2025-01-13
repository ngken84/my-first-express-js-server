import { Request, Response } from 'express';

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

const ShopController = {
    getShopIndex,
    getCart
}

export default ShopController;