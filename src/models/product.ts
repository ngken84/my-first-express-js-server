const products: Product[] = [];

export default class Product {

    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}
