const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const input = document.querySelector("input");
const answer = document.querySelector(".answer");
const del = document.querySelector(".del");
const regexPattern = /([0-9]*[.])?[0-9]+|[+-/*%^]/g;
const solve = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "%": (x, y) => x % y,
  "^": (x, y) => x ** y,
};

function calculate(exp) {
  let stack = exp
    .match(regexPattern)
    .map((x) => (/\d+/.test(x) ? parseFloat(x) : x));

  //this loop just solves the   equation.
  let ans = stack[0];

  for (let i = 1; i < stack.length; i = i + 2) {
    ans = solve[stack[i]](ans, stack[i + 1]);
  }

  if (Number.isInteger(ans)) return ans;
  return ans.toFixed(2);
}

function backspace(string) {
  return string.slice(0, -1);
}

function removeDuplicate(string) {
  let pattern = /[+\-/*%^]{2,}/;
  if (pattern.test(string)) {
    string = string.slice(0, -2) + string.slice(-1);
  }
  if (pattern.test(string.slice(-1))) {
    string = string.slice(0, -1);
  }
  return string;
}


function result() {
  let res = calculate(input.value);
  answer.innerText = res !== NaN ? res : screen.value;
  answer.style.textAlign = "right";
  answer.style.transform = "scale(1.1)";
}

function clear() {
  input.value = "";
  answer.innerText = "";
}
function resizeFont(element) {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const area = width * height;
  const fontSize = Math.sqrt(area) / 2;
  element.style.fontSize = `${fontSize}px`;
}

items.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (e.target.innerText != undefined) input.value += e.target.innerText;
    resizeFont(input);
    resizeFont(answer);
  })
);

document.querySelector(".result").addEventListener("click", result);
document.querySelector(".clear").addEventListener("click", clear);
window.addEventListener("keydown", (e) => {
  
  if (e.key === "Enter") {
    e.preventDefault();
    result();
  }
  if (e.key === "Delete") {
    clear();
  }
  if (e.key === "Backspace") {
    input.value = backspace(input.value);
  }

});

del.addEventListener("click", () => {
  input.value = backspace(input.value);
});

document.addEventListener("click", () => {
  input.value = removeDuplicate(input.value);
  if (input.value.match(/(?<=[\+\-\*\/\^])\d+/g)) {
    console.log(1);
    let ans = calculate(input.value);
    answer.innerText = !isNaN(ans) ? ans : calculate(input.value.slice(0, -1));
  }
});

input.addEventListener("keydown", function (event) {
  if (!regexPattern.test(event.key)) {
    event.preventDefault();
  }
});

window.onload = () => {
  input.focus();
}
