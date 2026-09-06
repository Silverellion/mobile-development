interface User {
    id: number;
    name: string;
    email: string;
  }
  
  async function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: `User ${id}`,
          email: `user${id}@example.com`,
        });
      }, 1000);
    });
  }
  
  (async () => {
    const user = await fetchUser(1);
  
    console.log(user);
  })();