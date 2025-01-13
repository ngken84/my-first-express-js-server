import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';

const products: Product[] = [];

export default class Product {

    title: string;

    constructor(title: string) {
        this.title = title;
    }
    
    private static getFilePath() {
        return path.join(rootDir, 'data', 'products.json');
    }

    save(callback: (err: NodeJS.ErrnoException | null) => void) {
        const p = Product.getFilePath();
        fs.readFile(p, 'utf8', (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push({title: this.title});
            fs.writeFile(p, JSON.stringify(products), 'utf8', (err) => {
                callback(err);
            });
        });
        
    }

    static fetchAll(callback: (products : Product[]) => void) {
        fs.readFile(Product.getFilePath(), 'utf8', (err, fileContent) => {
            if(err || !fileContent) {
                return callback([]);
            }
            const jsonArray = JSON.parse(fileContent) as {title: string}[];
            const prodArray: Product[] = [];
            for(let prodJson of jsonArray) {
                let newProduct = new Product(prodJson.title);
                prodArray.push(newProduct);
            }
            callback(prodArray);
        })
    }
}
