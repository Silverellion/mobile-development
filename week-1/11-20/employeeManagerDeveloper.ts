class Employee {
    public name: string;
    public salary: number;

    public constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public displayInfo(): void {
        console.log("Name: " + this.name);
        console.log("Salary: " + this.salary);
    }
}

class Manager extends Employee {
    public manageTeam(): void {
        console.log(this.name + " is managing the team.");
    }
}

class Developer extends Employee {
    public writeCode(): void {
        console.log(this.name + " is writing code.");
    }
}

const manager: Manager = new Manager("Alice", 5000);
manager.displayInfo();
manager.manageTeam();

const developer: Developer = new Developer("John", 4000);
developer.displayInfo();
developer.writeCode();