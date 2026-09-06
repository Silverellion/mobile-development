async function getMultipleTodos(): Promise<void> {
    const responses = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/1"),
      fetch("https://jsonplaceholder.typicode.com/todos/2"),
      fetch("https://jsonplaceholder.typicode.com/todos/3"),
    ]);
  
    const results = await Promise.all(
      responses.map((response) => response.json())
    );
  
    console.log(results);
  }
  
  getMultipleTodos();