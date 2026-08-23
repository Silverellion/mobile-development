import { Student } from "../1-10/student";
import { Teacher } from "./teacher";

export class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    public displayInfo(): void {
        console.log("Students:");

        for (const student of this.students) {
            student.displayInfo();
        }

        console.log("Teachers:");

        for (const teacher of this.teachers) {
            teacher.introduce();
        }
    }
}

const school: School = new School();

const student1: Student = new Student("John", 20, "A");
const student2: Student = new Student("Alice", 21, "B");

const teacher1: Teacher = new Teacher(
    "Mr. Smith",
    35,
    "Mathematics"
);

school.addStudent(student1);
school.addStudent(student2);
school.addTeacher(teacher1);

school.displayInfo();