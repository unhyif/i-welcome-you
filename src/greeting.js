"use strict";

// Variables

const KEYS = {
  username: "username",
  clock: "clock",
};
const CLASSES = {
  hidden: "hidden",
};

const usernameForm = document.querySelector(".username-form"); // REVIEW: Scope
const usernameInput = document.querySelector(".username");

// Functions

// - Username related functions -

/**
 * usernameInput의 width를 동적으로 설정하는 함수
 *
 * 1) Event handler로서 실행된 경우:
 * - 입력값 있을 시) 입력값의 length,
 * - 입력값 지워졌을 시) usernameInput의 placeholder의 length에 기반하여 width를 설정한다.
 *
 * 2) Else:
 * - username이 localStorage에 존재 시) username의 length,
 * - 없을 시) usernameInput의 placeholder의 length에 기반하여 width를 설정한다.
 * @param {Event} e
 * @param {string} username
 */
function setUsernameInputWidth(e, username) {
  // width의 기반이 될 text 설정
  const placeholder = usernameInput.placeholder;
  let text;

  if (e) {
    text = e.target.value ? e.target.value : placeholder;
  } else {
    text = username ? username : placeholder;
  }

  // width 계산에 고려되는 관련 CSS values // REVIEW
  const styles = {
    fontSize: getComputedStyle(usernameInput)["font-size"],
    fontFamily: getComputedStyle(usernameInput)["font-family"],
    padding: parseInt(getComputedStyle(usernameInput)["padding-left"]),
  };

  // width 계산 // REVIEW
  const context = document.createElement("canvas").getContext("2d");
  context.font = `${styles.fontSize} ${styles.fontFamily}`;
  const textWidth = context.measureText(text).width;

  usernameInput.style.width =
    (textWidth + 2 * (styles.padding ? styles.padding : 0)) * 0.1 + "rem";
}

/**
 * Save submitted username in localStorage, and then display username & greeting.
 * @param {Event} e
 */
function onUsernameFormSubmit(e) {
  e.preventDefault();

  const username = usernameInput.value;
  localStorage.setItem(KEYS.username, username);

  document.title = `I welcome ${username} 🙌`;
  usernameInput.placeholder = "이름 입력 후 Enter!";
  usernameInput.blur(); // REVIEW: deactivate autofocus
  displayUsername(username);
  displayGreeting();
}

/**
 * Display username on usernameInput with dynamically calculated width.
 * @param {string} username
 */
function displayUsername(username) {
  document.title = `I welcome ${username} 🙌`;
  setUsernameInputWidth(null, username);
  usernameInput.value = username;
}

// - Greeting related functions -

/**
 * Display greeting next to username.
 * Greeting becomes visible only when the username exists in localStorage.
 */
function displayGreeting() {
  hideTempGreeting();

  const greeting = document.querySelector(".greeting");
  greeting.innerText = `님, ${getRandomGreeting()}`;
  greeting.classList.remove(CLASSES.hidden);
}

/**
 * Hide temporary greeting which was displayed to guests.
 */
function hideTempGreeting() {
  document
    .querySelector(".primary__temp-greeting")
    .classList.add(CLASSES.hidden);
}

/**
 * Get a surprise greeting if 7 is randomly generated.
 * Otherwise, get a timely greeting instead.
 */
function getRandomGreeting() {
  return Math.floor(Math.random() * 10) === 7
    ? "기지개 한 번 펴세요!"
    : getTimelyGreeting();
}

/**
 * Get a timely greeting which is different depending on whether it's in the daytime or nighttime.
 */
function getTimelyGreeting() {
  const hour = new Date().getHours();
  return 5 <= hour && hour < 18 // REVIEW: n <= variable <= m doesn't work in JS
    ? "즐거운 하루 보내세요!"
    : "오늘도 수고했어요 :)"; // REVIEW: return is necessary & switch isn't suitable here
}

// - Set up functions -

function setUsernameEventListeners() {
  usernameInput.addEventListener("focus", setUsernameInputWidth);
  usernameInput.addEventListener("focusout", setUsernameInputWidth);
  usernameInput.addEventListener("input", setUsernameInputWidth); // REVIEW: input/change/keyboard events
  usernameForm.addEventListener("submit", onUsernameFormSubmit);
}

function greetingInit() {
  const username = localStorage.getItem(KEYS.username);
  setUsernameEventListeners();

  // If username exists in localStorage
  if (username) {
    displayUsername(username);
    displayGreeting();
  }

  // If not
  else {
    usernameInput.placeholder = "이름을 알려 주세요!";
    usernameInput.focus(); // REVIEW: activate autofocus

    /**
     * Set the width of usernameInput based on placeholder.
     * Arguments shouldn't be passed.
     */
    setUsernameInputWidth();
  }
}

// Main

greetingInit();
