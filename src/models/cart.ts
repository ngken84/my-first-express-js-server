import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';

import Product from './product';


export interface ProductInCart {
    productId: number,
    count: number
}

export interface CartContents {
    products : ProductInCart[],
    totalCost : number
}

export default class Cart {

    public static addProduct(product: Product, callback: (err: NodeJS.ErrnoException | null) => void) {
       
        if(product) {
            Cart.getCartContents((cart) => {
                let cartItem = cart.products.find((p) => p.productId === product.id);
                if(cartItem) {
                    cartItem.count++;
                } else {
                    cart.products.push({
                        productId: product.id,
                        count: 1
                    });
                }
                cart.totalCost += product.price;
                console.log(cart);
                fs.writeFile(Cart.getFilePath(), JSON.stringify(cart), 'utf8', (err) => {
                    callback(err);
                });
            })
        }
    }

    public static removeProduct(product: Product, callback: (err: NodeJS.ErrnoException | null) => void) {
        if(product) {
            Cart.getCartContents((contents) => {
                const item = contents.products.find((i) => i.productId === product.id)
                if(item) {
                    let newCost = contents.totalCost - (product.price * item.count);
                    let newContents : CartContents = {
                        products: contents.products.filter((i) => i.productId !== product.id),
                        totalCost: newCost
                    }
                    fs.writeFile(Cart.getFilePath(), JSON.stringify(newContents), 'utf8', (err) => {
                        callback(err);
                    });
                } else {
                    callback(null);
                }
            })
        } else {
            callback(null);
        }
    }

    public static getCartContents(callback : (contents : CartContents) => void) {
        const file = Cart.getFilePath();
        fs.readFile(file, 'utf8', (err, fileContent) => {
            let cartContents : CartContents = {
                products: [],
                totalCost: 0
            }
            if(!err) {
                cartContents = JSON.parse(fileContent) as CartContents;
            }
            callback(cartContents);
        });
    }

    private static getFilePath() {
        return path.join(rootDir, 'data', 'cart.json');
    }

}