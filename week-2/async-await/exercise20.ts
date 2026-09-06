function timeout(time: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("API call timed out"));
      }, time);
    });
  }
  
  async function fetchUserWithTimeout(id: number): Promise<User> {
    return Promise.race([
      fetchUser(id),
      timeout(2000),
    ]);
  }
  
  (async () => {
    try {
      const user = await fetchUserWithTimeout(1);
  
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  })();