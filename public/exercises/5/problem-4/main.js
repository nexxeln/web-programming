class TodoApp {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.currentFilter = "all";
    this.setupEventListeners();
    this.renderTasks();
  }

  setupEventListeners() {
    document
      .getElementById("addTask")
      .addEventListener("click", () => this.addTask());
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        this.currentFilter = btn.dataset.filter;
        this.renderTasks();
      });
    });

    document.getElementById("clearCompleted").addEventListener("click", () => {
      this.tasks = this.tasks.filter((task) => !task.completed);
      this.saveTasks();
      this.renderTasks();
    });
  }

  addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text) {
      const task = {
        id: Date.now(),
        text: text,
        completed: false,
      };

      this.tasks.push(task);
      this.saveTasks();
      this.renderTasks();
      input.value = "";
    }
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case "active":
        return this.tasks.filter((task) => !task.completed);
      case "completed":
        return this.tasks.filter((task) => task.completed);
      default:
        return this.tasks;
    }
  }

  renderTasks() {
    const taskList = document.getElementById("taskList");
    const filteredTasks = this.getFilteredTasks();

    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <span class="task-text">${task.text}</span>
                <button class="delete-task">
                    <i class="fas fa-trash"></i>
                </button>
            `;

      li.querySelector(".task-checkbox").addEventListener("change", () => {
        this.toggleTask(task.id);
      });

      li.querySelector(".delete-task").addEventListener("click", () => {
        this.deleteTask(task.id);
      });

      taskList.appendChild(li);
    });

    const activeCount = this.tasks.filter((task) => !task.completed).length;
    document.getElementById("taskCount").textContent = `${activeCount} task${
      activeCount !== 1 ? "s" : ""
    } left`;
  }
}

window.addEventListener("load", () => {
  new TodoApp();
});
