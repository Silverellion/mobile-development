abstract class Appliance {
    public abstract turnOn(): void;
}

class Fan extends Appliance {
    public turnOn(): void {
        console.log("Fan is turning on.");
    }
}

class AirConditioner extends Appliance {
    public turnOn(): void {
        console.log("Air conditioner is turning on.");
    }
}

const fan: Fan = new Fan();
fan.turnOn();

const airConditioner: AirConditioner = new AirConditioner();
airConditioner.turnOn();