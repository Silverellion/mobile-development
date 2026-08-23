export class Person {
    protected name: string;
    protected age: number;

    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public displayInfo(): void {
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
    }
}

const person: Person = new Person("John", 25);
person.displayInfo();