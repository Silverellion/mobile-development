import { simulateTask } from "../basics-with-promise/exercise5";

(async () => {
    const result1 = await simulateTask(1000);
    console.log(result1);
  
    const result2 = await simulateTask(2000);
    console.log(result2);
  
    const result3 = await simulateTask(1500);
    console.log(result3);
  })();