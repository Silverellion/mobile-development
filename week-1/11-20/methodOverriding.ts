class OverridingAnimal {
    public name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public sound(): void {
        console.log("Animal makes a sound.");
    }
}

class Dog extends OverridingAnimal {
    public override sound(): void {
        console.log(this.name + " says: Woof!");
    }
}

class Cat extends OverridingAnimal {
    public override sound(): void {
        console.log(this.name + " says: Meow!");
    }
}

const overridingAnimals: OverridingAnimal[] = [
    new Dog("Buddy"),
    new Cat("Whiskers"),
    new OverridingAnimal("Unknown")
];

for (const overridingAnimal of overridingAnimals) {
    overridingAnimal.sound();
}