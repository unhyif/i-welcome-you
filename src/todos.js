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
  updateTodos(todosArray);

  todoInput.value = null;
  renderNewTodo(newTodo);
}

function updateTodos(todosArray) {
  localStorage.setItem(KEYS.todos, JSON.stringify(todosArray));
}

function renderNewTodo(newTodo) {
  todos.innerHTML += createTodoHTML(newTodo);
  setEventListenerOnCheckBoxes();
}

function createTodoHTML(todo) {
  return `<li class="${CLASSES.todo}">
  <input type="checkbox" id="${todo.id}" class="${CLASSES.todoCheckBox}" />
  <label for="${todo.id}" class="${CLASSES.todoContent}">${todo.content}</label>
  </li>`;
}

function HideAndShowTodosTap() {
  const todosWrapper = document.querySelector(".todos-wrapper");
  const todosTap = document.querySelector(".todos-tap");
  const todosTapWidth = parseInt(getComputedStyle(todosTap)["width"]);

  const todosTapBtn = document.querySelector(".todosTapBtn");
  console.log(
    parseInt(getComputedStyle(todosWrapper)["width"]),
    parseInt(getComputedStyle(todosTapBtn)["width"]),
    todosTapWidth
  );

  todosWrapper.style.transform = `translateX(${todosTapWidth}px)`;

  todosTapBtn.addEventListener("mouseenter", () => {
    todosTapBtn.classList.add(CLASSES.todosTapBtnHide);
    todosWrapper.classList.add(CLASSES.showTodosTap); // REVIEW
  });
  todosTap.addEventListener("mouseleave", () => {
    todosTapBtn.classList.remove(CLASSES.todosTapBtnHide);
    todosWrapper.classList.remove(CLASSES.showTodosTap);
  });
}

function renderAllTodos() {
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
  $(todo).fadeOut(800, () => $(todo).remove());
}

function deleteTodo(id) {
  todosArray = todosArray.filter((todo) => todo.id !== id);
  updateTodos(todosArray);
}

// Main

HideAndShowTodosTap();
renderAllTodos();
todoForm.addEventListener("submit", onTodoFormSubmit);
