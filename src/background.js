// Functions

function setBackground() {
  const url = `https://source.unsplash.com/random/${innerWidth}×${innerHeight}/?${getTerm()}`;
  document.body.style.backgroundImage = `url(${url})`;
}

function getTerm() {
  let term;
  const hour = new Date().getHours();

  if (5 <= hour && hour < 12) {
    term = "morning,fresh";
  } else if (12 <= hour && hour < 18) {
    term = "afternoon,happy";
  } else if (18 <= hour && hour < 21) {
    term = "evening,sunset";
  } else {
    term = "night";
  }

  return term;
}

// 브라우저 작은 창에서 load 후, 큰 창으로 사이즈 조절시 화질 깨질 수 있음
function onResize() {
  document.body.style.backgroundSize = `${innerWidth}px ${innerHeight}px`;
}

// Main

setBackground();
window.addEventListener("resize", onResize);
