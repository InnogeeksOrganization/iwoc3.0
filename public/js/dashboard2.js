const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const logo = document.querySelector(".mainlogo");

dark.addEventListener("click", function () {
  document.querySelector("body").classList.add("darkMode");
  light.classList.remove("active");
  dark.classList.add("active");
  logo.src = "../public/img/season_3/iwoc_horizontal_complete_logo_light.png";
  localStorage.setItem("theme", "dark");
});

light.addEventListener("click", function () {
  document.querySelector("body").classList.remove("darkMode");
  dark.classList.remove("active");
  light.classList.add("active");
  logo.src = "../public/img/season_3/iwoc_logo_dashboard.png";
  localStorage.setItem("theme", "light");
});

window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.querySelector("body").classList.add("darkMode");
    light.classList.remove("active");
    dark.classList.add("active");
    logo.src = "../public/img/season_3/iwoc_horizontal_complete_logo_light.png";
  }
}