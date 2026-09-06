function simulateTask(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("Task done");
      }, time);
    });
  }
  
  simulateTask(2000).then((result) => {
    console.log(result);
  });