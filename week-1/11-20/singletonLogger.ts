class Logger {
    private static instance: Logger;

    private constructor() {
    }

    public static getInstance(): Logger {
        if (Logger.instance === undefined) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    public log(message: string): void {
        console.log("[LOG] " + message);
    }
}

const logger1: Logger = Logger.getInstance();
logger1.log("Application started.");
const logger2: Logger = Logger.getInstance();
logger2.log("User logged in.");

console.log(logger1 === logger2);