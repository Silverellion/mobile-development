async function fetchUsers(ids: number[]): Promise<User[]> {
    return await Promise.all(
      ids.map((id) => fetchUser(id))
    );
  }
  
  (async () => {
    const users = await fetchUsers([1, 2, 3]);
  
    console.log(users);
  })();