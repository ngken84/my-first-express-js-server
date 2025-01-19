import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';


export interface ProductInCart {
    productId: number,
    count: number
}

export interface CartContents {
    products : ProductInCart[],
    totalCost : number
}

export default class Cart {

    public static addProduct(id: number) {
        
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