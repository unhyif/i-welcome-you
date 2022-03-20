const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-modal");

function openModal() {
  modal.classList.remove(CLASSES.hidden);
  overlay.classList.remove(CLASSES.hidden);
}

function closeModal() {
  modal.classList.add(CLASSES.hidden);
  overlay.classList.add(CLASSES.hidden);
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Reset
modal.querySelector(".resetBtn").addEventListener("click", () => {
  if (confirm("데이터를 되돌릴 수 없어요! 그래도 진행할까요?")) {
    localStorage.clear();
    location.reload();
  }
});
