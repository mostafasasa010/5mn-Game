// Change Theme
const changeTheme = document.querySelector(".change-theme");

const savedTheme = window.localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.toggle("dark-theme", savedTheme === "moon");
  changeTheme.classList.toggle("bx-sun", savedTheme === "sun");
}

changeTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  window.localStorage.setItem("theme", isDarkTheme ? "moon" : "sun");
  changeTheme.classList.toggle("bx-sun", !isDarkTheme);
});
