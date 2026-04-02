document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    //create unique id for each taskText
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;
      li.classList.toggle("completed");

      if (task.completed) {
        celebrate();
      }

      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
    todoList.appendChild(li);
  }

  // add the all task to local storage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

function celebrate() {
  const colors = ["#ff4d4d", "#ffd93d", "#6bcB77", "#4d96ff", "#ff6ec7"];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // random horizontal position
    confetti.style.left = Math.random() * window.innerWidth + "px";

    // random size
    const size = Math.random() * 6 + 4;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    // random color
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // random duration
    const duration = Math.random() * 1 + 0.8;
    confetti.style.animationDuration = duration + "s";

    // random delay (makes it natural)
    confetti.style.animationDelay = Math.random() * 0.5 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}
