// Main Variables
const form = document.querySelector("form#diff");
const inputs = document.querySelectorAll(".div-inputs input")
  ? document.querySelectorAll(".div-inputs input")
  : null;
let difficult;
let coutry;
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

// Dynamic Style
let root = document.querySelector(":root");
let widthWindow = window.innerWidth;

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
  difficult = selectedRadio.value;
  const selectedValue = selectedRadio ? selectedRadio.value : null;
  if (selectedValue) {
    localStorage.setItem("difficulty", selectedValue);
  }
  changeScreenFun();
  getImageFun();
  generateInputsFun(getTriesFun());
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
  coutry = countries[randomCountry];
}

// Get Numbers Of Tries Function
function getTriesFun() {
  let tries;
  if (difficult === "easy") {
    tries = 5;
  } else if (difficult === "normal") {
    tries = 3;
  } else {
    tries = 1;
  }
  return tries;
}

// Generate Inputs Function
function generateInputsFun(tries) {
  const sectionInputs = document.querySelector(".inputs");
  for (let i = 1; i <= tries; i++) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const divInputs = document.createElement("div");
    span.innerHTML = `الهبدة ${i}:`;
    for (let j = 1; j <= coutry.length; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("maxLength", 1);
      input.id = `try-${i}-letter-${j}`;
      divInputs.appendChild(input);
      // Dynamic Style
      let Dwidth = (widthWindow * 0.78125) / coutry.length;
      root.style.setProperty(
        "--width-input",
        `calc(${widthWindow * 0.78125}px / ${coutry.length})`
      );
      root.style.setProperty("--font-input", `${Dwidth * 0.7}px`);
    }
    divInputs.className = "div-inputs";
    div.appendChild(span);
    div.appendChild(divInputs);
    sectionInputs.appendChild(div);
    // Dynamic Style
    root.style.setProperty("--grid-input", `repeat(${coutry.length}, 1fr)`);
  }
}
