// Variables

const savedTodos = localStorage.getItem(KEYS.todos);
let todosArray = savedTodos ? JSON.parse(savedTodos) : [];

const todos = document.querySelector(".todos"); // REVIEW
let todoCheckBoxes; // REVIEW
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");

// Functions

function onTodoFormSubmit(e) {
  e.preventDefault();

  const newTodo = { id: Date.now(), content: todoInput.value };
  todosArray.push(newTodo);
  saveTodos(todosArray);

  todoInput.value = null;
  displayNewTodo(newTodo);
}

function saveTodos(todosArray) {
  localStorage.setItem(KEYS.todos, JSON.stringify(todosArray));
}

function displayNewTodo(newTodo) {
  todos.innerHTML += createTodoHTML(newTodo);
  setEventListenerOnCheckBoxes();
}

function createTodoHTML(todo) {
  return `<li class="${CLASSES.todo}">
  <input type="checkbox" id="${todo.id}" class="${CLASSES.todoCheckBox}" />
  <label for="${todo.id}" class="${CLASSES.todoContent}">${todo.content}</label>
  </li>`;
}

function renderTodos() {
  const todosHTML = todosArray.map(createTodoHTML).join("");
  todos.innerHTML = todosHTML;

  setEventListenerOnCheckBoxes();
}

function setEventListenerOnCheckBoxes() {
  todoCheckBoxes = document.querySelectorAll(`.${CLASSES.todoCheckBox}`);
  todoCheckBoxes.forEach((checkBox) => {
    checkBox.addEventListener("input", onTodoChecked);
  });
}

function onTodoChecked(e) {
  const todo = e.target.parentElement;
  fadeAndRemoveTodo(todo);
  deleteTodo(Number(e.target.id));
}

function fadeAndRemoveTodo(todo) {
  $(todo).fadeOut(1000, () => $(todo).remove());
}

function deleteTodo(id) {
  todosArray = todosArray.filter((todo) => todo.id !== id);
  saveTodos(todosArray);
}

// Main

renderTodos();
todoForm.addEventListener("submit", onTodoFormSubmit);
