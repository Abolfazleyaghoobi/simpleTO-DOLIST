const inputAdd = document.querySelector(".InputAddTodoList>input");
const addBTN = document.querySelector(".addNewTask");
const ul = document.querySelector(".containerList>ul");
const alertText = document.querySelector(".alert");
const alertINP = document.querySelector(".inputAlert");
const closeBtn = document.querySelector(".close1");
// create new element 
let inputV;
let newElLi;
function createEl() {
  newElLi = document.createElement("li");
  newElLi.innerHTML = `
    <div class="check">
    <span>
    
    </span>
    </div>
    <h3>${inputV}</h3>
    `;
  ul.appendChild(newElLi);
}
// reapet text alert
let reapetT;
function reapetTextAlet() {
  reapetT = new TypeIt(alertINP, {
    strings: "Read a book",
    speed: 100,
  }).go();
}
// add new task
addBTN.addEventListener("click", () => {
  inputV = inputAdd.value;
  if (inputV == "") {
    alertText.classList.add("showAlertContent");
    reapetTextAlet();
  } else {
    createEl();
    inputAdd.value = "";
  }
});
// campleted task
let isCampleted = false;
ul.addEventListener("click", (e) => {
  //%% nN=>nodeName
  const nN = e.target.nodeName;
if (!isCampleted) {
  if (nN === "LI" || nN === "H3" || nN === "DIV") {
    newElLi.firstElementChild.innerHTML = `
   <i class="bi bi-check"></i>
   `;
    newElLi.lastElementChild.style.textDecoration = "line-through";
    newElLi.style.backgroundColor="#ccffc3"

  }
  isCampleted=true
  console.log(33);
  
}else{
  isCampleted=false
  newElLi.firstElementChild.innerHTML = ``;
  newElLi.lastElementChild.style.textDecoration = "none";
  newElLi.style.backgroundColor=""
  
  console.log(33);
  
}

});
// close window alert
closeBtn.addEventListener("click", (e) => {
  reapetT.reset();
  alertText.classList.remove("showAlertContent");
  console.log(e.target);
});

//
