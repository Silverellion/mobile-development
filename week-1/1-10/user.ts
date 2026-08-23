export class User {
    protected name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

const user: User = new User("John");
console.log(user.getName());

user.setName("Alice");
console.log(user.getName());