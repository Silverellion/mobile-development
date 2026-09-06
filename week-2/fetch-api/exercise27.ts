async function fetchWithRetry(
    url: string,
    retries: number
  ): Promise<unknown> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.log(`Attempt ${attempt} failed`);
  
        if (attempt === retries) {
          throw error;
        }
      }
    }
  
    throw new Error("Request failed");
  }
  
  async function startRetry(): Promise<void> {
    try {
      const data = await fetchWithRetry(
        "https://jsonplaceholder.typicode.com/todos/1",
        3
      );
  
      console.log(data);
    } catch (error) {
      console.log("All attempts failed:", error);
    }
  }
  
  startRetry();