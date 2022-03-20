// Functions

function setBackground() {
  const background = document.querySelector(".background");
  const url = `https://source.unsplash.com/random/${screen.width}×${
    screen.height
  }/?${getTerm()}`; // REVIEW
  background.src = url;
}

function getTerm() {
  let term;
  const hour = new Date().getHours();

  if (5 <= hour && hour < 12) {
    term = "morning,sunrise";
  } else if (12 <= hour && hour < 18) {
    term = "afternoon,happy";
  } else if (18 <= hour && hour < 21) {
    term = "evening,sunset";
  } else {
    term = "night";
  }

  return term;
}

// Main

setBackground();
