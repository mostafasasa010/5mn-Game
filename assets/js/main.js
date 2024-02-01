// Main Variables
const form = document.querySelector("form#diff");
const startBtn = document.querySelector(".start-btn");
let countries = [
  "مصر",
  "ايطاليا",
  "فرنسا",
  "الصين",
  "روسيا",
  "اليابان",
  "امريكا",
  "انجلترا",
  "السعودية",
  "الامارات",
  "العراق",
  "فلسطين",
  "الكويت",
  "البحرين",
  "الهند",
  "المالديف",
  "البرازيل",
];

// Change Theme
const changeTheme = document.querySelector(".change-theme");
const savedTheme = window.localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.toggle("dark-theme", savedTheme === "moon");
  changeTheme.classList.toggle("bx-sun", savedTheme === "sun");
}
changeTheme.addEventListener("click", () => {
  changeThemeFun();
});

// Handle Submit
form.onsubmit = (e) => {
  handleSubmitFun(e);
};

// Change Screen
startBtn.addEventListener("click", () => {
  changeScreenFun();
  getImageFun();
});

// Difficult Game
const savedValue = localStorage.getItem("difficulty");
if (savedValue) {
  const radio = document.querySelector(
    `input[name='diff'][value='${savedValue}']`
  );
  if (radio) {
    radio.checked = true;
  }
}

/* --------------------- */
/* --------------------- */
/* ----- Functions ----- */
/* --------------------- */
/* --------------------- */
// Change Theme Function
function changeThemeFun() {
  document.body.classList.toggle("dark-theme");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  window.localStorage.setItem("theme", isDarkTheme ? "moon" : "sun");
  changeTheme.classList.toggle("bx-sun", !isDarkTheme);
}

// Handle Submit Function
function handleSubmitFun(e) {
  e.preventDefault();
  const selectedRadio = document.querySelector(
    "form#diff input[name='diff']:checked"
  );
  const selectedValue = selectedRadio ? selectedRadio.value : null;
  if (selectedValue) {
    localStorage.setItem("difficulty", selectedValue);
  }
}

// Change Screen Function
function changeScreenFun() {
  const sectionStart = document.querySelector("section.start-section");
  const sectionStartInfo = document.querySelector("section.start-section.info");
  const sectionGame = document.querySelector("section.game-section");
  sectionStart.classList.add("hide");
  sectionStartInfo.classList.add("hide");
  sectionGame.classList.add("active");
}

// Get Random Image Function
function getImageFun() {
  let randomCountry = Math.floor(Math.random() * countries.length);
  let image = document.querySelector(`.image img.i-${randomCountry + 1}`);
  image.classList.add("visiable");
}
