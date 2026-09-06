function simulateTaskWithName(time: number, name: string): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`${name} finished`);
      }, time);
    });
  }
  
  Promise.race([
    simulateTaskWithName(3000, "Task 1"),
    simulateTaskWithName(1000, "Task 2"),
    simulateTaskWithName(2000, "Task 3"),
  ]).then((result) => {
    console.log("First to finish:", result);
  });