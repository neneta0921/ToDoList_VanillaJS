const inputText = document.getElementById("textNewTodo");
const todoItemsEl = document.querySelector(".todo-items");
// const completeItemsEl = document.querySelector(".complete-items");
const addBtn = document.getElementById("add-btn");
// const completeBtn = document.querySelector(".complete-button");
// const deleteBtn = document.querySelector(".delete-button");
// const returnBtn = document.querySelector("return-btn");
const todoList = [];

// Create TODO DOM
function createNewTodoDOM(text) {
  // Create new Todo item
  const newTodo = document.createElement("li");
  newTodo.classList.add("list-group-item");
  const todoText = document.createElement("span");
  todoText.textContent = text;
  todoText.classList.add("todo-item");
  // Create Buttons
  const completeBtn = document.createElement("button");
  completeBtn.type = "button";
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "完了";
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "削除";
  // Append
  newTodo.append(todoText, completeBtn, deleteBtn);
  todoItemsEl.appendChild(newTodo);
  // Delete Text
  inputText.value = "";
}

// Save Todo Items to Local Storage
function saveToLocalStorage(text, state) {
  const saveTodoList = {
    name: text,
    state: state
  };
  todoList[todoList.length] = saveTodoList;
  localStorage.setItem("todoLists", JSON.stringify(todoList));
}

// Create Todo Item, save local storage
function createNewTodoItem(text, state) {
  createNewTodoDOM(text);
  saveToLocalStorage(text, state);
}

// Create New Todo Item
function createNewTodo() {
  createNewTodoItem(inputText.value, "unfinished");
}

// Check LocalStorage, if todo list exits, show todo items
function showTodoLists() {
  if (localStorage.getItem("todoLists")) {
    JSON.parse(localStorage.getItem("todoLists")).forEach((item) => {
      todoList.push(item);
    });
    todoList.forEach((item) => {
      createNewTodoDOM(item.name);
    });
  }
}

// Event Listener
addBtn.addEventListener("click", () => createNewTodo());

// On Load
showTodoLists();
