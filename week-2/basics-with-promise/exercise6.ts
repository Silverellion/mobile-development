import { simulateTask } from "./exercise5";
Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ]).then((results) => {
    console.log(results);
  });
  
