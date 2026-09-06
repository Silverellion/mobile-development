interface StudentUser {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(ids: number[]): Promise<StudentUser[]> {
  const users = await Promise.all(
    ids.map(async (id): Promise<StudentUser> => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      return await response.json();
    })
  );

  return users;
}

fetchUsers([1, 2, 3]).then((users) => {
  console.log(users);
});