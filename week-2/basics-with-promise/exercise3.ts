function rejectTask(): Promise<never> {
    return new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Something went wrong"));
      }, 1000);
    });
  }
  
  rejectTask().catch((error: Error) => {
    console.log(error.message);
  });