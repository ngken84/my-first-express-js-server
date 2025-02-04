import * as fs from 'fs';
import path from 'path';
import rootDir from '../helper/path';

export interface ProductInterface {
    title: string,
    description: string,
    cost: string,
    imageUrl: string,
    id: number
}

export default class Product {

    id: number

    constructor(
        public title: string, 
        public description: string,
        public cost: string,
        public imageUrl: string,
        id = 0
    ) {
        if(id < 1) {
            this.id = Date.now();
        } else {
            this.id = id;
        }
        if(this.cost && this.cost.length > 0 && this.cost[0] !== '$') {
            this.cost = '$' + this.cost;
        }
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
        if(!this.cost || this.cost.length == 0) {
            return "Please enter a cost.";
        }
        const regex = /^\$?(0|[1-9]\d*)(\.\d{1,2})?$/;
        if(!regex.test(this.cost)) {
            return "Please enter a valid cost.";
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
        return parseFloat(this.cost.substring(1));
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

    save(allowOverwrite: boolean, callback: (err: NodeJS.ErrnoException | null) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            if(allowOverwrite) {
                const newArray = array.filter((p) => p.id !== this.id);
                newArray.push({
                    title: this.title, 
                    description: this.description,
                    cost: this.cost,
                    imageUrl: this.imageUrl,
                    id: this.id
                });
                fs.writeFile(Product.getFilePath(), JSON.stringify(newArray), 'utf8', (err) => {
                    callback(err);
                });
            } else {
                const search = array.find((p) => p.id === this.id);
                if(search) {
                    return callback(null);
                }
                array.push({
                    title: this.title, 
                    description: this.description,
                    cost: this.cost,
                    imageUrl: this.imageUrl,
                    id: this.id
                })
                fs.writeFile(Product.getFilePath(), JSON.stringify(array), 'utf8', (err) => {
                    callback(err);
                });
            }
        });
    }

    static fetchAll(callback: (products : Product[]) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            const prodArray: Product[] = [];
            for(let prodJson of array) {
                let newProduct = new Product(
                    prodJson.title, 
                    prodJson.description, 
                    prodJson.cost, 
                    prodJson.imageUrl, 
                    prodJson.id);
                prodArray.push(newProduct);
            }
            callback(prodArray);
        });
    }

    static deleteById(id: number, callback: (deletedProduct: Product | undefined) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            const p = array.filter(o => o.id === id) as ProductInterface[];
            if(p) {
                const newArray = array.filter(o => o.id !== id);
                fs.writeFile(Product.getFilePath(), JSON.stringify(newArray), 'utf8', (err) => {
                    callback(new Product(p[0].title, p[0].description, p[0].cost, p[0].imageUrl, p[0].id));
                })
            } else {
                callback(undefined);
            }
        })
    }

    static fetchById(id: number, callback: (product : Product | undefined) => void) {
        Product.getProductJsonArrayFromFile((array) => {
            const p = array.find(o => o.id === id);
            if(p) {
                callback(new Product(
                    p.title,
                    p.description,
                    p.cost,
                    p.imageUrl,
                    p.id
                ));
            } else {
                callback(undefined);
            }
        })
    }

    static fetchMapByIds(ids: number[], callback: (productMap : Map<number, ProductInterface>) => void) {
        Product.getProductJsonArrayFromFile((products) => {
            const list = products.filter((p) => ids.includes(p.id));
            const map = new Map<number, ProductInterface>();
            console.log(list);
            for(let i = 0; i < list.length; ++i) {
                map.set(list[i].id, list[i]);
            }
            callback(map);
        });
    }
}
