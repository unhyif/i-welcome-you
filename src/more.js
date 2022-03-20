// Reset
document.querySelector(".resetBtn").addEventListener("click", () => {
  if (confirm("데이터를 되돌릴 수 없어요! 그대로 진행할까요?")) {
    localStorage.clear();
    location.reload();
  }
});

// Modal

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openBtns = document.querySelectorAll(".show-modal");
const closeBtn = document.querySelector(".close-modal");

const HIDDEN_KEY = "hidden";

function openModal() {
  modal.classList.remove(HIDDEN_KEY);
  overlay.classList.remove(HIDDEN_KEY);
}

function closeModal() {
  modal.classList.add(HIDDEN_KEY);
  overlay.classList.add(HIDDEN_KEY);
}

for (const btn of openBtns) {
  btn.addEventListener("click", openModal);
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains(HIDDEN_KEY)) closeModal();
});
