// Functions

function onGeoResponse(location) {
  ({ latitude: lat, longitude: lon } = location.coords); // REVIEW
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${SECRETS.weather}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWeather(json))
    // REVIEW
    .catch(console.log);
}

function displayWeather(json) {
  const city = json.name;
  const desc = json.weather[0].main;
  const temp = json.main.temp;

  document.querySelector(".weather__location").innerText = city;
  document.querySelector(".weather__detail").innerText = `${desc} / ${temp}°C`;
}

function onGeoError() {
  alert("현재 위치를 알 수 없어요!");
}

// Main

navigator.geolocation.getCurrentPosition(onGeoResponse, onGeoError);
