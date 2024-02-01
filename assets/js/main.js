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

// Difficult Game
const form = document.querySelector("form#diff");
const startBtn = document.querySelector(".start-btn");

const savedValue = localStorage.getItem("difficulty");
if (savedValue) {
  const radio = document.querySelector(
    `input[name='diff'][value='${savedValue}']`
  );
  if (radio) {
    radio.checked = true;
  }
}

form.onsubmit = function (e) {
  e.preventDefault();
  const selectedRadio = document.querySelector(
    "form#diff input[name='diff']:checked"
  );
  const selectedValue = selectedRadio ? selectedRadio.value : null;

  if (selectedValue) {
    localStorage.setItem("difficulty", selectedValue);
  }
};
