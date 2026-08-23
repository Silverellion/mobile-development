class Product {
    public name: string;
    public price: number;

    public constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const products: Product[] = [
    new Product("Laptop", 1000),
    new Product("Mouse", 50),
    new Product("Keyboard", 150),
    new Product("Monitor", 300)
];

const expensiveProducts: Product[] = products.filter(
    (product: Product) => product.price > 100
);

console.log(expensiveProducts);