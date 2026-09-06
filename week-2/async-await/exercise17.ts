import { simulateTask } from "../basics-with-promise/exercise5";
(async () => {
    const promises = [
      simulateTask(1000),
      simulateTask(2000),
      simulateTask(1500),
    ];
  
    for await (const result of promises) {
      console.log(result);
    }
  })();