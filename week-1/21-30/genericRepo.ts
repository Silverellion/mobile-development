class Repository<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public getAll(): T[] {
        return this.items;
    }
}

const repository: Repository<string> = new Repository<string>();

repository.add("Apple");
repository.add("Banana");
repository.add("Orange");

console.log(repository.getAll());