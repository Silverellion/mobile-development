abstract class Shape {
    public abstract area(): number;
}

class Square extends Shape {
    public side: number;

    public constructor(side: number) {
        super();
        this.side = side;
    }

    public area(): number {
        return this.side * this.side;
    }
}

class Circle extends Shape {
    public radius: number;

    public constructor(radius: number) {
        super();
        this.radius = radius;
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const square: Square = new Square(5);
console.log("Square area: " + square.area());

const circle: Circle = new Circle(3);
console.log("Circle area: " + circle.area());