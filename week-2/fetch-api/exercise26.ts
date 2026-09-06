async function waitFiveSeconds(): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 5000);
    });
  
    console.log("5 seconds have passed");
  }
  
  waitFiveSeconds();