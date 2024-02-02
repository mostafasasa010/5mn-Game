// Main Variables
const form = document.querySelector("form#diff");
const againBtn = document.querySelector("button.again");
const backBtn = document.querySelector("button.back");
const checkBtn = document.querySelector("button.check-word");
const hintBtn = document.querySelector("button.hint");
let inputs;
let difficult;
let coutry;
let currentTry = 1;
let countTries;
let countHint;
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
changeTheme.addEventListener("click", changeThemeFun);

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

// Again Button
againBtn.addEventListener("click", againFun);

// Back Button
backBtn.addEventListener("click", backBtnFun);

// Check Button
checkBtn.addEventListener("click", checkWord);

// Hint Button
hintBtn.addEventListener("click", getHint);

// Handle Backspace
document.addEventListener("keydown", handleBackSpace);

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
  countTries = tries;
  countHint = difficult === "hard" ? 1 : 2;
  return tries;
}

// Generate Inputs Function
function generateInputsFun(tries) {
  const sectionInputs = document.querySelector(".inputs");
  document.querySelector(".hint span").innerHTML = `(${countHint})`;
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
  document.querySelector(`.div-inputs #try-${currentTry}-letter-1`).focus();
  inputs = document.querySelectorAll(".div-inputs input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      handleInputsFun(input, index);
    });
  });
}

// Play Again Function
function againFun() {
  let activeImage = document.querySelectorAll(".image .visiable");
  let inputs = document.querySelectorAll(".inputs > div");
  const gameBtns = document.querySelectorAll(".game-btns > div button");
  activeImage.forEach((img) => {
    img.classList.remove("visiable");
  });
  inputs.forEach((input) => {
    input.remove();
  });
  gameBtns.forEach((btn) => {
    btn.disabled = false;
  });
  getImageFun();
  generateInputsFun(getTriesFun());
}

// Back Button Function
function backBtnFun() {
  window.location.reload();
}

// Check Word Function
function checkWord() {
  let success = true;
  for (let i = 0; i < coutry.length; i++) {
    let inputWord = document.getElementById(
      `try-${currentTry}-letter-${i + 1}`
    );
    let guessLetter = inputWord.value;
    let actualLetter = coutry[i];
    if (guessLetter === actualLetter) {
      const inputs = document.querySelectorAll(".div-inputs input");
      const gameBtns = document.querySelectorAll(
        ".game-btns .manage-btns button"
      );
      inputs.forEach((input) => {
        input.classList.add("disable");
        input.disabled = true;
      });
      gameBtns.forEach((btn) => {
        btn.disabled = true;
      });
      inputWord.classList.add("win");
    } else {
      success = false;
      inputWord.classList.add("lose");
    }
  }
  if (!success) {
    if (currentTry <= countTries) {
      currentTry++;
    }
    console.log(currentTry);
    document.querySelector(`.div-inputs #try-${currentTry}-letter-1`)
      ? document
          .querySelector(`.div-inputs #try-${currentTry}-letter-1`)
          .focus()
      : null;
    if (currentTry > countTries) {
      const inputs = document.querySelectorAll(".div-inputs input");
      const gameBtns = document.querySelectorAll(
        ".game-btns .manage-btns button"
      );
      inputs.forEach((input) => {
        input.classList.add("disable");
        input.disabled = true;
      });
      gameBtns.forEach((btn) => {
        btn.disabled = true;
      });
    }
  }
}

function getHint() {
  if (countHint > 0) {
    countHint--;
    document.querySelector(".hint span").innerHTML = `(${countHint})`;
  }

  if (countHint === 0) {
    hintBtn.classList.add("disabled");
    hintBtn.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyInputs.length);
    const randomInput = emptyInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = coutry[indexToFill];
    }
  }
}

// Handle Inputs
function handleInputsFun(input, index) {
  const nextLetter = inputs[index + 1];
  nextLetter ? nextLetter.focus() : null;
}

// Handle Backspace Function
function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}
