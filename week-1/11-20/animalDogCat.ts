class Animal {
    public name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

class DogAnimal extends Animal {
    public bark(): void {
        console.log(this.name + " says: Woof!");
    }
}

class CatAnimal extends Animal {
    public meow(): void {
        console.log(this.name + " says: Meow!");
    }
}

const dogAnimal: DogAnimal = new DogAnimal("Buddy");
dogAnimal.bark();

const catAnimal: CatAnimal = new CatAnimal("Whiskers");
catAnimal.meow();