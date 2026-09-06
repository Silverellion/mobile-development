(async () => {
    try {
      const result = await rejectTask();
  
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  })();