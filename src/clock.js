/**
 * Display current time on the page.
 */
function displayTime(type) {
  const date = new Date();
  let time;

  if (type === 12) {
    const style = new Intl.DateTimeFormat("en", {
      timeStyle: "medium",
      hourCycle: "h12",
    }); // REVIEW
    time = style.format(date);
  } else {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    time = `${padWithZero(hour)}:${padWithZero(minute)}:${padWithZero(second)}`;
  }

  const clock = document.querySelector(".clock");
  clock.innerText = time;
}

/**
 * Pad number with zero if the given number is lower than 10.
 @param {number} number
 */
function padWithZero(/* number */ number) {
  return number < 10 ? String(number).padStart(2, "0") : number;
}

function onTimeConvertBtnClick() {
  let newType;

  if (!savedClock) {
    newType = 12;
  } else {
    newType = savedClock === "12" ? 24 : 12;
  }
  clearInterval(interval); // Clear previous interval;

  localStorage.setItem(KEYS.clock, newType);
  displayTime(newType);
  interval = setInterval((newType) => displayTime(newType), 1000);
}

// Main

const savedClock = localStorage.getItem(KEYS.clock);
const type = savedClock ? Number(savedClock) : 24;
displayTime(type);
let interval = setInterval((type) => {
  displayTime(type);
}, 1000); // REVIEW

document
  .querySelector(".timeConvertBtn")
  .addEventListener("click", onTimeConvertBtnClick);
