class Stack<T> {
    private items: T[] = [];

    public push(item: T): void {
        this.items.push(item);
    }

    public pop(): T | undefined {
        return this.items.pop();
    }

    public peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const stack: Stack<number> = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());    // 30
console.log(stack.pop());     // 30
console.log(stack.peek());    // 20
console.log(stack.isEmpty()); // false