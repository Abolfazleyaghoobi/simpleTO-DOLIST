    let db;

function initDB() {
  return new Promise((res, rej) => {
    let todoDB = window.indexedDB.open("todoListDB", 1);

    todoDB.addEventListener("error", (e) => {
      console.log("error");
    });
    // ~ successfully 
    todoDB.addEventListener("success", (e) => {
      console.log("database opened  successfully");
      db = todoDB.result;

      showTask();
      res(db)
    });
    // %% upgrade db
    todoDB.addEventListener("upgradeneeded", (e) => {
      let db = e.target.result;
      let objectStore = db.createObjectStore("contentTask", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("contentTask", "contentTask", {
        unique: false,
      });
    });
  });
}

function addToDB(inputValue) {
  let newItem = {
    contentTask: inputValue,
  };
  let transaction = db.transaction(["contentTask"], "readwrite");
  let objectStore = transaction.objectStore("contentTask");
  let result = objectStore.add(newItem);
  transaction.addEventListener("complete", () => {
    console.log("successflly");
  });
  transaction.addEventListener("error", () => {
    console.log("error");
  });
}
function showTask() {
  return new Promise((res, rej) => {
    let resultShowTask = [];
    let objectStore = db.transaction("contentTask").objectStore("contentTask");
    objectStore.openCursor().onsuccess = (e) => {
      let cursor = e.target.result;
      if (cursor) {
        resultShowTask.push(cursor.value);

        cursor.continue();
      } else {
        res(resultShowTask);
      }
    };
  });
}

export { addToDB, showTask ,initDB};
