const API_TODOS = "http://localhost:8000/api/todos/";

async function fetchTodos() {
  const res = await fetch(API_TODOS, { credentials: "include" });
  if (!res.ok) {
    alert("Please login again!");
    window.location.href = "/";
    return;
  }
  const todos = await res.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.description || ""}
      [${todo.completed ? "✅ Done" : "🕓 Pending"}]
      <button onclick="toggleTodo(${todo.id}, ${todo.completed})">Toggle</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById("todoForm").onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const res = await fetch(API_TODOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, description }),
  });
  if (res.ok) {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    fetchTodos();
  }
};

async function deleteTodo(id) {
  await fetch(API_TODOS + id + "/", { method: "DELETE", credentials: "include" });
  fetchTodos();
}

async function toggleTodo(id, completed) {
  await fetch(API_TODOS + id + "/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTodos();
}

document.getElementById("logoutBtn").onclick = async () => {
  await fetch("http://localhost:8000/api/users/logout/", {
    method: "POST",
    credentials: "include",
  });
  alert("Logged out!");
  window.location.href = "/";
};

fetchTodos();
