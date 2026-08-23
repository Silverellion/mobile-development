class Car {
    public brand: string;
    public model: string;
    public year: number;

    public constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    public showCarInfo(): void {
        console.log("Brand: " + this.brand);
        console.log("Model: " + this.model);
        console.log("Year: " + this.year);
    }
}

const car: Car = new Car("Toyota", "Corolla", 2022);
car.showCarInfo();