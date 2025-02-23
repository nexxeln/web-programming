let currentLight = 0;
const lights = document.querySelectorAll(".light");

function changeLight() {
  lights[currentLight].classList.remove("active");
  currentLight = (currentLight + 1) % lights.length;
  lights[currentLight].classList.add("active");
}

setInterval(changeLight, 1000);
