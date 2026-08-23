interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class Bird implements Flyable {
    public fly(): void {
        console.log("Bird is flying.");
    }
}

class Fish implements Swimmable {
    public swim(): void {
        console.log("Fish is swimming.");
    }
}

const bird: Bird = new Bird();
bird.fly();

const fish: Fish = new Fish();
fish.swim();