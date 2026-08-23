interface Animal {
    name: string;
    sound(): void;
}

class Dog implements Animal {
    public name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public sound(): void {
        console.log("Woof!");
    }
}

const dog: Dog = new Dog("Buddy");

console.log(dog.name);
dog.sound();