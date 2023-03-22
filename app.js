const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const screen = document.querySelector(".screen");
const del = document.querySelectorAll(".del");
const regexPattern = /([0-9]*[.])?[0-9]+|[+-/*%^]/g;

// regex either matches a string containing any of the mentioned operators, or number of any length.

let solve = {
  "+": (x, y) => {
    return x + y;
  },
  "-": (x, y) => {
    return x - y;
  },
  "*": (x, y) => {
    return x * y;
  },
  "/": (x, y) => {
    return x / y;
  },
  "%": (x, y) => {
    return x % y;
  },
  "^": (x, y) => {
    return x ** y;
  },
};

function calculate(exp) {
  let stack = exp
    .match(regexPattern)
    .map((x) => (/\d+/.test(x) ? parseFloat(x) : x));

  //this loop just solves the equation.
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
  let pattern = /[+-/*^]{2,}/;
  if (pattern.test(string)) {
    string = string.slice(0, -2) + string.slice(-1);
  }
  if (pattern.test(string.slice(-1))) {
    string = string.slice(0, -1);
  }
  return string;
}

function variableFontSize() {
  let area = screen.offsetHeight * screen.offsetWidth;
  let text = screen.value.length;
  let fontSize = Math.sqrt(area / text)/2;
  screen.style.fontSize = fontSize + "px";
  
}

container.addEventListener("click", (e) => {

  switch (e.target.innerText) {
    case "=":
      screen.value = calculate(screen.value);
      break;

    case "C":
      screen.value = "";
      break;

    default:
      screen.value += e.target.innerText;
      break;
  }
  variableFontSize();

});

document.addEventListener("click", () => {
  let ans = removeDuplicate(screen.value);
  screen.value = ans;
});
