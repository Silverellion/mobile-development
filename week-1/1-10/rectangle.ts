class Rectangle {
    public width: number;
    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public calculateArea(): number {
        return this.width * this.height;
    }

    public calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const rectangle: Rectangle = new Rectangle(10, 5);

console.log("Area: " + rectangle.calculateArea());
console.log("Perimeter: " + rectangle.calculatePerimeter());