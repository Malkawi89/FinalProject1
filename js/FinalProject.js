document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const addButton = document.getElementById("add-btn");
    const listContainer = document.getElementById("list-container");

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        listContainer.innerHTML = "";
        savedTasks.forEach(task => addTask(task.text, task.checked));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#list-container li").forEach(li => {
            tasks.push({ text: li.textContent.trim(), checked: li.classList.contains("checked") });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(taskText, checked = false) {
        if (taskText.trim() === "") 
            return;

        const li = document.createElement("li");
        li.textContent = taskText;
        if (checked) 
            li.classList.add("checked");

        const span = document.createElement("span");
        span.innerHTML = '<img src="/icons/trash-bin (1).png" alt="delete">';
        li.appendChild(span);

        listContainer.appendChild(li);
        inputBox.value = "";
        saveTasks();
    }

    addButton.addEventListener("click", () => addTask(inputBox.value));

    inputBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(inputBox.value);
        }
    });

    listContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        } else if (event.target.closest("span")) {
            event.target.closest("li").remove();
        }
        saveTasks();
    });

    loadTasks();
});