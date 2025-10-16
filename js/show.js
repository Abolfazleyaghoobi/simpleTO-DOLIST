import { initDB, showTask } from "./todoDB.js";
const elem=(e)=>{
    return`
    <li id=${e.id}>
    <div class="check">
    <span>
    
    </span>
    </div>
    <h3>${e.contentTask}</h3>
    <div class="deletIcon"><i class="bi bi-trash3"></i></div>
    </li>
    `
}
export async function showTaskT(ul){
    
let taskArray;
let task = await initDB()
  .then((res) => {
    return showTask();
  })
  .then((res) => {
    taskArray = res;
  });
if (taskArray) {
    ul.innerHTML=''
  taskArray.forEach((e) => {
   if (e) {
    ul.insertAdjacentHTML("afterbegin", elem(e))
   }
  });
}
}