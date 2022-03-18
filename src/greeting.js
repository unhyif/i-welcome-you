"use strict";

const CONSTANTS = {
  /* KEY */
  username: "username",

  /* CLASS NAME */
  hidden: "hidden",
  full: "full",

  /* SIZE */
  inputFontSize: 1.6,
};
const usernameForm = document.querySelector(".username-form");
const usernameInput = document.querySelector(".username");

/**
 * usernameInput의 width를 설정하는 함수
 *
 * 1) Event handler로서 실행된 경우: width를 동적으로 설정한다. (Dynamic width)
 * - 입력값 있을 시) 입력값의 length,
 * - 입력값 지워졌을 시) usernameInput의 placeholder의 length를 기반으로 width를 설정한다.
 *
 * 2) Else: width를 정적으로 설정한다. (Static width)
 * - username이 localStorage에 존재 시) username의 length,
 * - 없을 시) usernameInput의 placeholder의 length를 기반으로 width를 설정한다.
 * @param {Event} e
 * @param {string} username
 */
function setUsernameInputWidth(e, username) {
  const placeholder = usernameInput.placeholder;
  let value;

  if (e) {
    value = e.target.value ? e.target.value : placeholder;
  } else {
    value = username ? username : placeholder;
  }
  const valueLength = value.length;

  usernameInput.style.width =
    (valueLength + 1) * CONSTANTS.inputFontSize + "rem"; // TODO: Not use fixed font size
}

/**
 * Save submitted username in localStorage,
 * execute displayUsername & displayGreeting function.
 * @param {Event} e
 */
function onUsernameFormSubmit(e) {
  e.preventDefault();

  const username = usernameInput.value;
  localStorage.setItem(CONSTANTS.username, username);

  usernameInput.blur(); // REVIEW: deactivate autofocus
  displayUsername(username);
  displayGreeting();
}

/**
 * Display username on usernameInput.
 * @param {string} username
 */
function displayUsername(username) {
  setUsernameInputWidth(null, username);
  usernameInput.value = username;
  usernameInput.classList.add(CONSTANTS.full);
}

/**
 * Display greeting next to username.
 * Greeting becomes visible only when the username exists.
 */
function displayGreeting() {
  hideTempGreeting();

  const greeting = document.querySelector(".greeting");
  greeting.classList.remove(CONSTANTS.hidden);
  greeting.innerText = `님, ${getRandomGreeting()}`;
}

/**
 * Hide temporary greeting which was displayed to guests.
 */
function hideTempGreeting() {
  document
    .querySelector(".primary__temp-greeting")
    .classList.add(CONSTANTS.hidden);
}

/**
 * Get random greeting depending on randomly generated number.
 * If the number isn't 7 unfortunately, execute getTimelyGreeting.
 */
function getRandomGreeting() {
  return Math.floor(Math.random() * 10) === 7
    ? "기지개 한 번 펴세요!"
    : getTimelyGreeting();
}

/**
 * Get timely greeting which is different in the daytime and nighttime.
 */
function getTimelyGreeting() {
  const hour = new Date().getHours();
  console.log(hour);
  return 5 <= hour && hour < 18 // REVIEW: n <= variable <= m doesn't work in JS
    ? "즐거운 하루 보내세요!"
    : "오늘도 수고했어요 :)"; // REVIEW: return is necessary & switch isn't suitable here
}

// MAIN

const username = localStorage.getItem(CONSTANTS.username);

// If username exists in localStorage
if (username) {
  displayUsername(username);
  displayGreeting();
} // If not
else {
  setUsernameInputWidth(); // Arguments shouldn't be passed
  usernameInput.focus(); // REVIEW: activate autofocus
}

usernameInput.addEventListener("input", setUsernameInputWidth); // REVIEW: input/change/keyboard events
usernameForm.addEventListener("submit", onUsernameFormSubmit);

document.querySelector(".delete").addEventListener("click", (e) => {
  localStorage.clear();
});
