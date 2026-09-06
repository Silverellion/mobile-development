async function multiplyByThree(number: number): Promise<number> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  
    return number * 3;
  }
  
  (async () => {
    const result = await multiplyByThree(5);
  
    console.log(result);
  })();