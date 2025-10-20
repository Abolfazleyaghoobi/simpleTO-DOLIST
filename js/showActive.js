import { initDB, showTask } from "./todoDB.js";
const elem = (e) => {
 

  return `
    <li id=${e.id} class=${e.isCompleted && "completed"}>
    <div class="check">
    <span>
      ${e.isCompleted ? `<i class="bi bi-check"></i>` : ""}
    </span>
    </div>
    <h3 class=${e.isCompleted && "khat"}>${e.contentTask}</h3>
    <div class="deletIcon"><i class="bi bi-trash3"></i></div>
    </li>
    `;

};
async function showActiveTask(ul) {
  let taskArray;
  await initDB()
    .then((res) => {
      return showTask();
    })
    .then((res) => {
      taskArray = res;
    });
 
  if (taskArray) {
    ul.innerHTML = "";
    taskArray.forEach((e) => {
      if (e.isCompleted) {
        ul.insertAdjacentHTML("afterbegin", elem(e));
      }
    });
  }
}

export default showActiveTask;
