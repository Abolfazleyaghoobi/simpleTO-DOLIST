// Import necessary modules from various files
import { addToDB, initDB, removeTask } from "./todoDB.js"; // Database operations
import { isCompleted } from "./isCompleted.js"; // Task completion status
import { showTaskT } from "./show.js"; // Task display functionality
// import { remove } from "./remove.js"; // Note: This import is commented out
import showActiveTask from "./showActive.js"; // Active task display
import showCompletedTask from "./showCompleted.js"; // Completed task display

//@ inputea - Input element for adding new tasks
const inputAdd = document.querySelector(".InputAddTodoList>input");
//@ Add btn todo - Button to add new tasks
const addBTN = document.querySelector(".addNewTask");
//@ container list Todo - Main container for task list
const ul = document.querySelector(".containerList>ul");
//! Showin active or Completed container - Container for filtering tasks
const containerList = document.querySelector(".SactiveCompleted");
// ~ active task - Button to show active tasks
const activeBTN = document.querySelector("#activeTask");
const campletedTask = document.querySelector("#campletedTask"); // Button to show completed tasks
const ul2 = document.querySelector(".containerTask  "); // Container for filtered tasks
//@ alert - Alert notification elements
const alertText = document.querySelector(".alert");
const alertINP = document.querySelector(".inputAlert");
const closeBtn = document.querySelector(".close1");
// import { addToDB, showTask, initDB } from "./todoDB.js"; // Note: This import is commented out
//~ colose btn Active or Completed container - Button to close filtered view
const closeActiveBTN = document.querySelector(".closeBTNac");

// // create new element - Note: This section is commented out
let inputV;

// Function to create HTML structure for a task
function ali(text) {
  return `
     <li>
            <div class="check">
              <span>
              
              </span>
              </div>
              <h3>${text}</h3>
              
          </li>
    `;
}

//~~ reapet text alert - Function for typing animation in alert
let reapetT;
function reapetTextAlet() {
  reapetT = new TypeIt(alertINP, {
    strings: "Read a book",
    speed: 100,
  }).go();
}

//@ add new task - Event listener for adding new tasks
addBTN.addEventListener("click", () => {
  inputV = inputAdd.value;
  if (inputV == "") {
    alertText.classList.add("showAlertContent");
    reapetTextAlet();
  } else {
    addToDB(inputV);
    // ul.innerHTML += ali(inputV);
    showTaskT(ul); // Display the new task
    inputAdd.value = "";
  }
});

//~~  close window alert - Event listener to close alert
closeBtn.addEventListener("click", (e) => {
  reapetT.reset();
  alertText.classList.remove("showAlertContent");
  console.log(e.target);
});

// @ campleted task - Event listener for task list interactions
ul.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.matches("i")) {
    // Check if delete icon is clicked

    e.stopPropagation(); // Prevent event bubbling

    try {
      await removeTask(li.id); // Remove task from database

      li.remove(); // Remove task from DOM

      console.log(`Task ${li.id} deleted ✅`);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  } else {
    // --- Task completion logic ---
    // 6. If delete icon wasn't clicked, then the task itself was clicked
    isCompleted(li.id, li); // Toggle task completion status
  }
});

// ~ show active task handler - Event listeners for filtering tasks
campletedTask.addEventListener("click", () => {
  containerList.style.visibility = "visible";
  showCompletedTask(ul2); // Show completed tasks
});

activeBTN.addEventListener("click", () => {
  containerList.style.visibility = "visible";
  showActiveTask(ul2); // Show active tasks
});

closeActiveBTN.addEventListener("click", () => {
  containerList.style.visibility = "hidden"; // Hide filtered view
});

// Initialize database and show initial tasks
initDB();
showTaskT(ul);

// Add event listener for Enter key press on the input field
inputAdd.addEventListener("keypress", (e) => {
  // Check if the pressed key is Enter (key code 13)
  if (e.key === "Enter") {
    // Prevent default behavior (like form submission)
    e.preventDefault();

    // Trigger the same logic as the add button click
    inputV = inputAdd.value;
    if (inputV == "") {
      alertText.classList.add("showAlertContent");
      reapetTextAlet();
    } else {
      addToDB(inputV);
      showTaskT(ul);
      inputAdd.value = "";
    }
  }
});
