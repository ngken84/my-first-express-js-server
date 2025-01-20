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
                cart.totalCost += product.costFloat;
                console.log(cart);
                fs.writeFile(Cart.getFilePath(), JSON.stringify(cart), 'utf8', (err) => {
                    callback(err);
                });
            })
        }
    }

    // public static removeProduct(product: Product, callback: (err: NodeJS.ErrnoException) => void) {
    //     if(product) {
    //         Cart.getCartContents()
    //     }
    // }

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