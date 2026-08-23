import { Person } from "../1-10/person";

class Box<T> {
    private value: T;

    public constructor(value: T) {
        this.value = value;
    }

    public getValue(): T {
        return this.value;
    }

    public setValue(value: T): void {
        this.value = value;
    }
}

const numberBox: Box<number> = new Box<number>(100);
console.log(numberBox.getValue());

const stringBox: Box<string> = new Box<string>("Hello");
console.log(stringBox.getValue());

const personBox: Box<Person> = new Box<Person>(
    new Person("John", 25)
);

personBox.getValue().displayInfo();