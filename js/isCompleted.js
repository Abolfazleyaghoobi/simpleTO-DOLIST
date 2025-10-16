import { initDB, showTask, updateTask } from "./todoDB.js";

export const isCompleted = async (id, li) => {
  const Id = +id;

  await initDB();

  const taskArray = await showTask();
  const targetTask = taskArray.find((task) => task.id === Id);
  const span=li.querySelector("span");
  const h3=li.querySelector("h3");
  if (targetTask) {
    if (!targetTask.isCompleted||!span.innerHTML) {
        targetTask.isCompleted = !targetTask.isCompleted;
        console.log("done");
        span.innerHTML=`<i class="bi bi-check"></i>`;
        h3.classList.add("khat");
        li.classList.add("completed");
    }
    else{
        
        targetTask.isCompleted = !targetTask.isCompleted;
        console.log("undone");
        span.innerHTML=``;
        h3.classList.remove("khat");
        li.classList.remove("completed");
    }
    await updateTask(targetTask);
  } else {
    console.log("Task not found ⚠️");
  }
};
