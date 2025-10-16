let db;

function initDB() {
  return new Promise((res, rej) => {
    let todoDB = window.indexedDB.open("todoListDB", 1);

    todoDB.addEventListener("error", (e) => {
      console.log("error");
    });

    todoDB.addEventListener("success", (e) => {
      console.log("database opened successfully");
      db = todoDB.result;
      res(db);
    });

    todoDB.addEventListener("upgradeneeded", (e) => {
      let db = e.target.result;
      db.createObjectStore("contentTask", {
        keyPath: "id",
        autoIncrement: true,
      });
    });
  });
}

function addToDB(inputValue) {
  let newItem = {
    contentTask: inputValue,
    isCompleted: false,
  };
  let transaction = db.transaction(["contentTask"], "readwrite");
  let objectStore = transaction.objectStore("contentTask");
  objectStore.add(newItem);
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

// ✅ تابع جدید برای آپدیت
function updateTask(task) {
  return new Promise((res, rej) => {
    let transaction = db.transaction(["contentTask"], "readwrite");
    let objectStore = transaction.objectStore("contentTask");
    let request = objectStore.put(task);

    request.onsuccess = () => {
      console.log("Task updated successfully ✅");
      res();
    };

    request.onerror = (e) => {
      console.error("Error updating task ❌", e);
      rej(e);
    };
  });
}

export { initDB, showTask, addToDB, updateTask };
