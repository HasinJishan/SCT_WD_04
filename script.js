document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("add-task").addEventListener("click", addTask);

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let title = document.getElementById("task-title").value.trim();
    let desc = document.getElementById("task-desc").value.trim();
    let date = document.getElementById("task-date").value;
    let time = document.getElementById("task-time").value;

    if (!title) {
        alert("Task title is required!");
        return;
    }

    let tasks = getTasks();
    tasks.push({ title, desc, date, time, completed: false });
    saveTasks(tasks);

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-time").value = "";

    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let card = document.createElement("div");
        card.classList.add("task-card");
        if (task.completed) card.classList.add("completed");

        card.innerHTML = `
            <div class="task-info">
                <strong>${task.title}</strong><br>
                ${task.desc ? task.desc + "<br>" : ""}
                ${task.date ? "📅 " + task.date : ""} 
                ${task.time ? "⏰ " + task.time : ""}
            </div>
            <div class="task-actions">
                <button class="complete">${task.completed ? "Undo" : "Done"}</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        card.querySelector(".complete").addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            loadTasks();
        });

        card.querySelector(".edit").addEventListener("click", () => {
            document.getElementById("task-title").value = task.title;
            document.getElementById("task-desc").value = task.desc;
            document.getElementById("task-date").value = task.date;
            document.getElementById("task-time").value = task.time;
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        });

        card.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        });

        taskList.appendChild(card);
    });
}
