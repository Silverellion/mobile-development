import { Product } from "../1-10/product";

class Order {
    private products: Product[] = [];

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public calculateTotal(): number {
        let total: number = 0;

        for (const product of this.products) {
            total += product.price;
        }

        return total;
    }
}

const order: Order = new Order();

order.addProduct(new Product("Laptop", 1000));
order.addProduct(new Product("Mouse", 50));
order.addProduct(new Product("Keyboard", 150));

console.log("Total: $" + order.calculateTotal());