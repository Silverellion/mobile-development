async function fetchAllResults(): Promise<void> {
    const urls = [
      "https://jsonplaceholder.typicode.com/todos/1",
      "https://jsonplaceholder.typicode.com/todos/2",
      "https://jsonplaceholder.typicode.com/invalid-url",
    ];
  
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
  
        return await response.json();
      })
    );
  
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Request ${index + 1}: Success`);
        console.log(result.value);
      } else {
        console.log(`Request ${index + 1}: Failed`);
        console.log(result.reason);
      }
    });
  }
  
  fetchAllResults();