interface Movable {
    move(): void;
}

class MovableCar implements Movable {
    public move(): void {
        console.log("Car is moving.");
    }
}

class MovableRobot implements Movable {
    public move(): void {
        console.log("Robot is moving.");
    }
}

const movableCar: Movable = new MovableCar();
movableCar.move();

const movableRobot: Movable = new MovableRobot();
movableRobot.move();