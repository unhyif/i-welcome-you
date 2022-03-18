/**
 * Display current time on the page.
 */
function displayTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const clock = document.querySelector(".clock");
  clock.innerText = `${padWithZero(hour)}:${padWithZero(minute)}:${padWithZero(
    second
  )}`;
}

/**
 * Pad number with zero if the given number is lower than 10.
 @param {number} number
 */
function padWithZero(/* number */ number) {
  return number < 10 ? String(number).padStart(2, "0") : number;
}

// MAIN

displayTime();
setInterval(displayTime, 1000);
