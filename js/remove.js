import { removeTask } from "./todoDB.js";

export const remove = (id, li,target) => {
    const icon = li.querySelector("i");
   
    
  if (!icon) return;

  icon.addEventListener("click", async (e) => {
    e.stopPropagation(); // 🚫 جلوگیری از اجرای isCompleted()

    // حذف از IndexedDB
    await removeTask(id);

    // حذف از DOM
    li.remove();

    console.log(`Task ${id} deleted ✅`);
  });
};
