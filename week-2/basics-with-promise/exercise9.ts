function getEvenNumbers(): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
      setTimeout(() => {
        const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
        const evenNumbers = numbers.filter((number) => number % 2 === 0);
  
        resolve(evenNumbers);
      }, 1000);
    });
  }
  
  getEvenNumbers().then((result) => {
    console.log(result);
  });