const inputText = document.getElementById("textNewTodo");
const undoItemsEl = document.querySelector(".undo-items");
const completeItemsEl = document.querySelector(".complete-items");
const addBtn = document.getElementById("add-btn");

let undoListArray = [];
let completeListArray = [];
let isCompleted = false;

// Store to Local Storage
function storeArraysInLocalStorage() {
  localStorage.setItem("undoListArray", JSON.stringify(undoListArray));
  localStorage.setItem("completeListArray", JSON.stringify(completeListArray));
}

// Update DOM
function updateDOM() {
  undoItemsEl.textContent = "";
  completeItemsEl.textContent = "";
  storeArraysInLocalStorage();
  showTodoLists();
}

// If array equal completeListArray, isCompleted turn to true
function checkArray(array) {
  if (JSON.stringify(array) == JSON.stringify(completeListArray)) {
    isCompleted = true;
  } else {
    isCompleted = false;
  }
}

// Delete TODO Item
function deleteTodoItem(index, targetArray) {
  checkArray(targetArray);
  const deleteList = targetArray[index];
  // Delete from targetArray
  targetArray = targetArray.filter((todoList) => todoList !== deleteList);
  // Update Local Storage
  if (!isCompleted) {
    undoListArray = targetArray;
  } else {
    completeListArray = targetArray;
  }
  // Update LocalStorage and DOM
  updateDOM();
}

function moveToOtherList(index, currentArray, nextArray) {
  checkArray(currentArray);
  const moveList = currentArray[index];
  // Delete from currentArray
  currentArray = currentArray.filter((todoList) => todoList != moveList);
  // Add to nextArray
  nextArray.push(moveList);
  if (!isCompleted) {
    undoListArray = currentArray;
    completeListArray = nextArray;
  } else {
    undoListArray = nextArray;
    completeListArray = currentArray;
  }
  // Update LocalStorage and DOM
  updateDOM();
}

// Update Todo Item Text
function updateItem(index, targetArray) {
  checkArray(targetArray);
  const targetEl = isCompleted ? completeItemsEl : undoItemsEl;
  const text = targetEl.children[index].children[0].textContent;
  if (!text) {
    deleteTodoItem(index, targetArray);
  } else {
    targetArray[index] = text;
  }
  updateDOM();
}

// Create TODO DOM
function createTodoDOM(text, index, currentArray, nextArray) {
  checkArray(currentArray);
  // Create  Todo List
  const todoList = document.createElement("li");
  todoList.classList.add("list-group-item");
  const todoText = document.createElement("span");
  todoText.textContent = text;
  todoText.setAttribute("contenteditable", "true");
  // Create Move Button
  const moveBtn = document.createElement("button");
  moveBtn.type = "button";
  // Create Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "削除";

  // Add class and select target element
  let targetEl = "";
  if (!isCompleted) {
    todoText.setAttribute("onfocusout", `updateItem(${index}, undoListArray)`);
    moveBtn.textContent = "完了";
    moveBtn.classList.add("complete-btn");
    moveBtn.setAttribute(
      "onclick",
      `moveToOtherList(${index}, undoListArray, completeListArray)`
    );
    deleteBtn.setAttribute(
      "onclick",
      `deleteTodoItem(${index}, undoListArray)`
    );
    targetEl = undoItemsEl;
  } else {
    todoText.setAttribute(
      "onfocusout",
      `updateItem(${index}, completeListArray)`
    );
    moveBtn.textContent = "戻る";
    moveBtn.classList.add("return-btn");
    moveBtn.setAttribute(
      "onclick",
      `moveToOtherList(${index}, completeListArray, undoListArray)`
    );
    deleteBtn.setAttribute(
      "onclick",
      `deleteTodoItem(${index}, completeListArray)`
    );
    targetEl = completeItemsEl;
  }

  // Append
  todoList.append(todoText, moveBtn, deleteBtn);
  targetEl.appendChild(todoList);
}

// Create New Todo Item
function createNewTodoList() {
  const text = inputText.value;
  if (!text) {
    window.alert("Please input TODO LIST!");
    return;
  }
  // Add Item to undoListArray
  undoListArray.push(text);
  // Get Index from undoListArray
  const undoListIndex = undoListArray.length - 1;
  createTodoDOM(text, undoListIndex, undoListArray, completeListArray);
  // Save undoListArray to Local Storage
  localStorage.setItem("undoListArray", JSON.stringify(undoListArray));
  // Delete InputBox Text
  inputText.value = "";
}

// Check LocalStorage, if todo list exits, show todo items
function showTodoLists() {
  if (localStorage.getItem("undoListArray")) {
    undoListArray = JSON.parse(localStorage.getItem("undoListArray"));
    undoListArray.forEach((todoList, index) => {
      createTodoDOM(todoList, index, undoListArray, completeListArray);
    });
  }
  if (localStorage.getItem("completeListArray")) {
    completeListArray = JSON.parse(localStorage.getItem("completeListArray"));
    completeListArray.forEach((completeList, index) => {
      createTodoDOM(completeList, index, completeListArray, undoListArray);
    });
  }
}

// Event Listener
addBtn.addEventListener("click", () => createNewTodoList());

// On Load
showTodoLists();
