import { Person } from "../1-10/person";

export class Teacher extends Person {
    public subject: string;

    public constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    public introduce(): void {
        console.log(
            "My name is " + this.name +
            ", I am " + this.age +
            " years old, and I teach " + this.subject + "."
        );
    }
}

const teacher: Teacher = new Teacher(
    "Walter Hartwell White",
    69,
    "Chemistry"
);

teacher.introduce();