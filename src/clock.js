/**
 * Display current time on the page.
 */
function displayTime(type) {
  const date = new Date();
  let time;

  if (type === 24) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    time = `${padWithZero(hour)}:${padWithZero(minute)}:${padWithZero(second)}`;
  } else {
    time = formatClock(date);
  }

  const clock = document.querySelector(".clock");
  clock.innerText = time;
}

function formatClock(date) {
  const style = new Intl.DateTimeFormat("en", {
    timeStyle: "medium",
    hourCycle: "h12",
  }); // REVIEW

  return style.format(date);
}

/**
 * Pad number with zero if the given number is lower than 10.
 @param {number} number
 */
function padWithZero(number) {
  return number < 10 ? String(number).padStart(2, "0") : number;
}

function onTimeConvertBtnClick() {
  clearInterval(interval); // Clear previous interval

  type = type === 24 ? 12 : 24;
  localStorage.setItem(KEYS.clock, type);
  displayTime(type);
  interval = setInterval(displayTime, 1000, type);

  timeConvertBtn.title = `${type === 24 ? 12 : 24}시간 형식으로 보기`;
}

// Main

const savedType = localStorage.getItem(KEYS.clock);
let type = savedType ? Number(savedType) : 24;
displayTime(type);
let interval = setInterval(displayTime, 1000, type); // REVIEW

const timeConvertBtn = document.querySelector(".timeConvertBtn");
timeConvertBtn.title = `${type === 24 ? 12 : 24}시간 형식으로 보기`;
timeConvertBtn.addEventListener("click", onTimeConvertBtnClick);
