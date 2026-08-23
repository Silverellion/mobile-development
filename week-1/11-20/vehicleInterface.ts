interface Vehicle {
    brand: string;
    start(): void;
    stop(): void;
}

class CarVehicle implements Vehicle {
    public brand: string;

    public constructor(brand: string) {
        this.brand = brand;
    }

    public start(): void {
        console.log(this.brand + " car is starting.");
    }

    public stop(): void {
        console.log(this.brand + " car is stopping.");
    }
}

class BikeVehicle implements Vehicle {
    public brand: string;

    public constructor(brand: string) {
        this.brand = brand;
    }

    public start(): void {
        console.log(this.brand + " bike is starting.");
    }

    public stop(): void {
        console.log(this.brand + " bike is stopping.");
    }
}

const car: CarVehicle = new CarVehicle("Toyota");
car.start();
car.stop();

const bike: BikeVehicle = new BikeVehicle("Yamaha");
bike.start();
bike.stop();