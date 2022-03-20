function recommend(activity) {
  document.querySelector(".meow").innerText = activity;
}

document.querySelector(".cat").addEventListener("mouseover", () => {
  fetch("http://www.boredapi.com/api/activity?type=recreational")
    .then((res) => res.json())
    .then((json) => recommend(json.activity))
    .catch(console.log);
});
