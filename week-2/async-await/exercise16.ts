(async () => {
    const results = await Promise.all([
      simulateTask(1000),
      simulateTask(2000),
      simulateTask(1500),
    ]);
  
    console.log(results);
  })();