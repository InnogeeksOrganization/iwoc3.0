const dark = document.querySelector(".dark");
const light = document.querySelector(".light");

dark.addEventListener("click", function () {
  document.querySelector("body").classList.add("darkMode");
  light.classList.remove("active");
  dark.classList.add("active");
  localStorage.setItem("theme", "dark");
});

light.addEventListener("click", function () {
  document.querySelector("body").classList.remove("darkMode");
  dark.classList.remove("active");
  light.classList.add("active");
  localStorage.setItem("theme", "light");
});

window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.querySelector("body").classList.add("darkMode");
    light.classList.remove("active");
    dark.classList.add("active");
  }
}