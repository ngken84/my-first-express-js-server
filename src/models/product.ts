import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';

import pool from '../helper/database';
import { RowDataPacket } from 'mysql2';

export interface ProductInterface extends RowDataPacket{
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    id: number
}

export default class Product {

    id: number

    constructor(
        public title: string, 
        public description: string,
        public price: number,
        public imageUrl: string,
        id = 0
    ) {
        this.id = id;
    }

    validateTitle() {
        if(!this.title || this.title.length == 0) {
            return "Please enter a title.";
        }
    }

    validateDescription() {
        if(!this.description || this.description.length == 0) {
            return "Please enter a description.";
        }
    }
    
    validateCost() {
        if(this.price < 0) {
            return "Please enter a valid cost";
        }
    }

    validateImageUrl() {
        if(!this.imageUrl || this.imageUrl.length === 0) {
            return;
        }
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
        if(!regex.test(this.imageUrl)) {
            return "Please enter a valid URL";
        }
    }

    get costFloat() {
        return this.price;
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
        if(this.id > 0) {

        } else {
            pool.execute("INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)", 
                [
                    this.title,
                    this.description,
                    this.price,
                    this.imageUrl
                ]
            ).then(() => {
                callback(null);
            }).catch(err => {
                console.log(err);
                callback(err);
            })
        }
    }

    static fetchAll(callback: (products : Product[]) => void) {
        const prodArray: Product[] = [];
        pool.execute<ProductInterface[]>("SELECT * from products")
        .then(([rows, fieldData]) => {
            const products : Product[] = []
            for(let data of rows) {
                products.push(new Product(
                    data.title,
                    data.description,
                    data.price,
                    data.imageUrl,
                    data.id
                ));
            }
            callback(products);
        })
        
    }

    static deleteById(id: number, callback: (deletedProduct: Product | undefined) => void) {
        pool.execute<ProductInterface[]>("SELECT * from products WHERE id= ?", [id])
        .then(([rows, fieldData]) => {
            if(rows.length > 0) {
                let data = rows[0];
                const deletedProduct = new Product(
                    data.title,
                    data.description,
                    data.price,
                    data.imageUrl,
                    data.id
                );
                pool.execute("DELETE FROM products WHERE id=?", [id])
                .then((_ => {
                    callback(deletedProduct);
                }));
            } else {
                callback(undefined);
            }
        });
    }

    static fetchById(id: number, callback: (product : Product | undefined) => void) {
        pool.execute<ProductInterface[]>("SELECT * FROM products WHERE id=?", [id])
        .then(([rows, fieldData]) => {
            if(rows.length > 0) {
                let data = rows[0];
                return callback(new Product(
                    data.title,
                    data.description,
                    data.price,
                    data.imageUrl,
                    data.id
                ));
            }
            return callback(undefined);
        })
    }

    static fetchMapByIds(ids: number[], callback: (productMap : Map<number, ProductInterface>) => void) {
        
        pool.execute<ProductInterface[]>("SELECT * from products")
        .then(([rows, fieldData]) => {
            const list = rows.filter((p) => ids.includes(p.id));
            const map = new Map<number, ProductInterface>();
            for(let i = 0; i < list.length; ++i) {
                map.set(list[i].id, list[i]);
            }
            callback(map);
        });
    }
}
