class MakeSoundAnimal {
    protected makeSound(): void {
        console.log("Animal makes a sound.");
    }

    public speak(): void {
        this.makeSound();
    }
}

class MakeSoundDog extends MakeSoundAnimal {
    protected override makeSound(): void {
        console.log("Woof!");
    }
}

class MakeSoundCat extends MakeSoundAnimal {
    protected override makeSound(): void {
        console.log("Meow!");
    }
}

const dog: MakeSoundDog = new MakeSoundDog();
dog.speak();

const cat: MakeSoundCat = new MakeSoundCat();
cat.speak();