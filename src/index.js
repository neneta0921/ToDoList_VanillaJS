const inputText = document.getElementById("textNewTodo");
const todoItemsEl = document.querySelector(".todo-items");
const completeItemsEl = document.querySelector(".complete-items");
const addBtn = document.getElementById("add-btn");

let todoListArray = [];
let completeListArray = [];

// Move to Complete Container
function goToCompleteList(index) {
  const moveList = todoListArray[index];
  // Delete from todoListArray
  todoListArray = todoListArray.filter((todoList) => todoList !== moveList);
  // Add to completeListArray
  completeListArray.push(moveList);
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
  localStorage.setItem("completeListArray", JSON.stringify(completeListArray));
  // Update DOM
  todoItemsEl.textContent = "";
  completeItemsEl.textContent = "";
  showTodoLists();
}

// Delete TODO Item
function deleteTodoItem(index) {
  const deleteList = todoListArray[index];
  // Delete from todoListArray
  todoListArray = todoListArray.filter((todoList) => todoList !== deleteList);
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
  // Update DOM
  todoItemsEl.textContent = "";
  showTodoLists();
}

// Create NEW TODO DOM
function createNewTodoDOM(text, index) {
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
  completeBtn.setAttribute("onclick", `goToCompleteList(${index})`);
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "削除";
  deleteBtn.setAttribute("onclick", `deleteTodoItem(${index})`);
  // Append
  newTodo.append(todoText, completeBtn, deleteBtn);
  todoItemsEl.appendChild(newTodo);
}

// Delete Complete TODO Item
function deleteCompleteTodoItem(index) {
  const deleteList = completeListArray[index];
  // Delete from todoListArray
  completeListArray = completeListArray.filter(
    (completeList) => completeList !== deleteList
  );
  localStorage.setItem("completeListArray", JSON.stringify(completeListArray));
  // Update DOM
  completeItemsEl.textContent = "";
  showTodoLists();
}

// Return todo items Container
function returnTodoList(index) {
  const moveList = completeListArray[index];
  // Delete from completeListArray
  completeListArray = completeListArray.filter(
    (completeList) => completeList !== moveList
  );
  // Add to completeListArray
  todoListArray.push(moveList);
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
  localStorage.setItem("completeListArray", JSON.stringify(completeListArray));
  // Update DOM
  todoItemsEl.textContent = "";
  completeItemsEl.textContent = "";
  showTodoLists();
}

// Create Complete TODO DOM
function createCompleteTodoDOM(text, index) {
  // Create Complete Todo item
  const completeTodo = document.createElement("li");
  completeTodo.classList.add("list-group-item");
  const todoText = document.createElement("span");
  todoText.textContent = text;
  todoText.classList.add("todo-item");
  // Create Buttons
  const returnBtn = document.createElement("button");
  returnBtn.type = "button";
  returnBtn.classList.add("return-btn");
  returnBtn.textContent = "戻る";
  returnBtn.setAttribute("onclick", `returnTodoList(${index})`);
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "削除";
  deleteBtn.setAttribute("onclick", `deleteCompleteTodoItem(${index})`);
  // Append
  completeTodo.append(todoText, returnBtn, deleteBtn);
  completeItemsEl.appendChild(completeTodo);
}

// Create New Todo Item
function createNewTodo() {
  const text = inputText.value;
  let todoListIndex = 0;
  // Add Item to todoListArray
  todoListArray.push(text);
  // Get Index from todoListArray
  todoListArray.forEach((item, index) => {
    if (item === text) {
      todoListIndex = index;
    }
  });
  createNewTodoDOM(text, todoListIndex);
  // Save Todo List to Local Storage
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
  // Delete InputBox Text
  inputText.value = "";
}

// Check LocalStorage, if todo list exits, show todo items
function showTodoLists() {
  if (localStorage.getItem("todoListArray")) {
    todoListArray = JSON.parse(localStorage.getItem("todoListArray"));
    todoListArray.forEach((todoList, index) => {
      createNewTodoDOM(todoList, index);
    });
  }
  if (localStorage.getItem("completeListArray")) {
    completeListArray = JSON.parse(localStorage.getItem("completeListArray"));
    completeListArray.forEach((completeList, index) => {
      createCompleteTodoDOM(completeList, index);
    });
  }
}

// Event Listener
addBtn.addEventListener("click", () => createNewTodo());

// On Load
showTodoLists();
