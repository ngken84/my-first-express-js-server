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
        Product.fetchMapByIds(ids, (productMap) => {
            let productList : {
                product: Product,
                count: number
            }[] = [];
            cart.products.forEach((element) => {
                const item = productMap.get(element.productId);
                if(item) {
                    productList.push({
                        product: new Product(item.title, item.description, item.cost, item.imageUrl, item.id),
                        count: element.count
                    });
                }                
            });

            res.render('shop/cart', {
                pageTitle: "My Cart",
                path: '/cart',
                cart: productList,
                totalAmount: cart.totalCost
            });
        })
    })
    
}

const postCart = (req: Request, res: Response, next: () => void) => {
    const { id } = req.body;
    const numId = parseInt(id);

    Product.fetchById(numId, (product) => {
        if(product) {
            Cart.addProduct(product, (err) => {
                res.redirect('/cart');
            });
        } else {
            res.redirect('/cart');
        }
    });
}

const postRemoveFromCart = (req: Request, res: Response, next: () => void) => {
    const { id } = req.body;
    const numId = parseInt(id);

    Product.fetchById(numId, (product) => {
        if(product) {
            Cart.removeProduct(product, (err) => {
                res.redirect('/cart');
            })
        } else {
            res.redirect('/cart');
        }
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
    postCart,
    postRemoveFromCart,
    getProduct
}

export default ShopController;