export const products: Product[] = [];

export class Product {

    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save() {
        products.push(this);
    }
}