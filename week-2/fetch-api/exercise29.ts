function processQueueTask(number: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Task ${number} completed`);
      }, 1000);
    });
  }
  
  async function queueProcess(): Promise<void> {
    const tasks = [1, 2, 3, 4, 5];
  
    for (const task of tasks) {
      const result = await processQueueTask(task);
  
      console.log(result);
    }
  }
  
  queueProcess();