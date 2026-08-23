import { Person } from "./person";

class Student extends Person {
    public grade: string;

    public constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    public displayInfo(): void {
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Grade: " + this.grade);
    }
}

const student: Student = new Student("Alice", 20, "A");
student.displayInfo();