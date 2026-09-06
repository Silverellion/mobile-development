import { simulateTask } from "../basics-with-promise/exercise5";
(async () => {
    const result = await simulateTask(2000);
  
    console.log(result);
})();