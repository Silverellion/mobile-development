interface ApiUser {
  id: number;
  name: string;
  email: string;
}

async function fetchUserWithTimeout(id: number): Promise<ApiUser> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("API call timed out"));
    }, 2000);
  });

  const request = fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  });

  return await Promise.race([request, timeout]);
}

fetchUserWithTimeout(1)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.message);
  });