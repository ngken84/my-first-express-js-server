import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';

interface ProductInterface {
    title: string
}

export default class Product {

    title: string;

    constructor(title: string) {
        this.title = title;
    }
    
    private static getFilePath() {
        return path.join(rootDir, 'data', 'products.json');
    }

    private static getProductJsonArrayFromFile(callback: (array: ProductInterface[]) =>  void) {
        const p = Product.getFilePath();
        fs.readFile(p, 'utf8', (err, fileContent) => {
            let products : ProductInterface[] = [];
            if(!err) {
                products = JSON.parse(fileContent) as ProductInterface[];
            }
            callback(products);
        });
    }

    save(callback: (err: NodeJS.ErrnoException | null) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            array.push({title: this.title});
            fs.writeFile(Product.getFilePath(), JSON.stringify(array), 'utf8', (err) => {
                callback(err);
            });
        });
    }

    static fetchAll(callback: (products : Product[]) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            const prodArray: Product[] = [];
            for(let prodJson of array) {
                let newProduct = new Product(prodJson.title);
                prodArray.push(newProduct);
            }
            callback(prodArray);
        });
    }
}
