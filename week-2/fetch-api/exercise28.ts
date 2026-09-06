function processBatchTask(number: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Task ${number} completed`);
      }, 1000);
    });
  }
  
  async function batchProcess(): Promise<void> {
    const results = await Promise.all([
      processBatchTask(1),
      processBatchTask(2),
      processBatchTask(3),
      processBatchTask(4),
      processBatchTask(5),
    ]);
  
    console.log(results);
  }
  
  batchProcess();