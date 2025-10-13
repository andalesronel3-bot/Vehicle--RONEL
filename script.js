const API_URL = "http://localhost:8080/users/darshan/todos";
const todoList = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("targetDate");

document.addEventListener("DOMContentLoaded", loadTodos);

// Load all todos
async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");
    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error("Error loading todos:", error);
    todoList.innerHTML = `<p>⚠️ Unable to load tasks.</p>`;
  }
}

// Display all todos
function displayTodos(todos) {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    todoList.innerHTML = "<p>No tasks yet. Add one above!</p>";
    return;
  }
  todos.forEach(renderTodo);
}

// Render a single todo
function renderTodo(todo) {
  const div = document.createElement("div");
  div.classList.add("todo-item");

  div.innerHTML = `
    <div>
      <h3>${todo.description}</h3>
      <p>📅 ${todo.targetDate} | ${todo.done ? "✅ Done" : "❌ Not Done"}</p>
    </div>
    <div class="todo-actions">
      <button class="edit-btn" onclick="updateTodo(${todo.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `;

  todoList.appendChild(div);
}

// Add a new task
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const description = descInput.value.trim();
  const targetDate = dateInput.value;

  if (!description || !targetDate) return alert("Please fill in all fields!");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "darshan",
        description,
        targetDate,
        done: false,
      }),
    });
    descInput.value = "";
    dateInput.value = "";
    loadTodos();
  } catch {
    alert("Failed to add task.");
  }
});

// Update a task
async function updateTodo(id) {
  const newDesc = prompt("Enter new description:");
  if (!newDesc) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: newDesc,
        targetDate: new Date().toISOString().split("T")[0],
        done: false,
        username: "darshan",
      }),
    });
    loadTodos();
  } catch {
    alert("Failed to update task.");
  }
}

// Delete a task
async function deleteTodo(id) {
  if (!confirm("Delete this task?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTodos();
  } catch {
    alert("Failed to delete task.");
  }
}
