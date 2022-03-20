// Variables

const savedTodos = localStorage.getItem(KEYS.todos);
let todosArray = savedTodos ? JSON.parse(savedTodos) : [];

const todos = document.querySelector(".todos-tap__todos"); // REVIEW
let todoCheckBoxes; // REVIEW
const todoForm = document.querySelector(".todos-tap__form");
const todoInput = document.querySelector(".todos-tap__input");

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
  removeEmptiness();

  todos.innerHTML += createTodoHTML(newTodo);
  setEventListenerOnCheckBoxes();
}

function removeEmptiness() {
  const empty = todos.querySelector(`.${CLASSES.empty}`);
  if (empty) empty.remove();
}

function createTodoHTML(todo) {
  return `<li class="${CLASSES.todo}">
  <input type="checkbox" id="${todo.id}" class="${CLASSES.todoCheckBox}" />
  <label for="${todo.id}" class="${CLASSES.todoContent}">${todo.content}</label>
  </li>`;
}

function HideAndShowTodosTap() {
  const todosWrapper = document.querySelector(".todos-wrapper");
  // const todosWrapperWidth = parseInt(getComputedStyle(todosWrapper)["width"]);
  const todosTap = document.querySelector(".todos-tap-wrapper");
  const todosTapWidth = parseInt(getComputedStyle(todosTap)["width"]);
  const todosTapBtn = document.querySelector(".todosTapBtn-wrapper");
  // console.log(
  //   parseInt(getComputedStyle(todosWrapper)["width"]),
  //   parseInt(getComputedStyle(todosTapBtn)["width"]),
  //   todosTapWidth
  // );

  todosWrapper.style.transform = `translateX(${todosTapWidth + 1}px)`;

  todosTapBtn.addEventListener("mouseenter", () => {
    // todosTapBtn.style.transform = `translateX(${todosWrapperWidth}px)`;
    todosTapBtn.classList.add(CLASSES.todosTapBtnHide);
    todosWrapper.classList.add(CLASSES.showTodosTap); // REVIEW
  });

  todosTap.addEventListener("mouseleave", () => {
    // todosTapBtn.style.transform = "none";
    todosTapBtn.classList.remove(CLASSES.todosTapBtnHide);
    todosWrapper.classList.remove(CLASSES.showTodosTap);
  });
}

function displayEmptiness() {
  if (!todosArray.length) {
    todos.innerHTML = `<p class="${CLASSES.empty}">해야 할 일을 작성해 보세요! 📝</p>`;
  }
}

function renderAllTodos() {
  const todosHTML = todosArray.map(createTodoHTML).join(""); // REVIEW: Array 비어 있어도 returns string
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

  displayEmptiness();
}

function fadeAndRemoveTodo(todo) {
  $(todo).fadeOut(700, () => {
    $(todo).remove();
  });
  console.log(1);
}

function deleteTodo(id) {
  todosArray = todosArray.filter((todo) => todo.id !== id);
  updateTodos(todosArray);
}

// function sleep(ms) {
//   const wakeUpTime = Date.now() + ms;
//   while (Date.now() < wakeUpTime) {}
// }

// Main

HideAndShowTodosTap();
renderAllTodos();
displayEmptiness();

todoForm.addEventListener("submit", onTodoFormSubmit);
