function performTask(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("Task completed");
      }, 1000);
    });
  }
  
  performTask()
    .then((result) => {
      console.log(result);
    })
    .catch((error: Error) => {
      console.log("Error:", error.message);
    })
    .finally(() => {
      console.log("Done");
    });