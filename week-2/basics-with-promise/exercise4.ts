function getRandomNumber(): Promise<number> {
    return new Promise<number>((resolve) => {
      const randomNumber = Math.random();
  
      resolve(randomNumber);
    });
  }
  
  getRandomNumber()
    .then((number) => {
      console.log("Random number:", number);
    })
    .catch((error) => {
      console.log("Error:", error);
    });