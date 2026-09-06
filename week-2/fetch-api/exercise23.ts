async function getCompletedTodos(): Promise<void> {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );
  
    const todos = await response.json();
  
    const completed = todos.filter(
      (todo: { completed: boolean }) => todo.completed
    );
  
    console.log(completed);
  }
  
  getCompletedTodos();