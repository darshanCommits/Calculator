const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const screen = document.querySelector(".screen");
const del = document.querySelectorAll(".del");
const regexPattern = /[+-/*%^]|\d+/g;
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
  return ans;
}

function backspace(string) {
  return string.slice(0, -1);
}

container.addEventListener("click", (e) => {
  console.log(e.target);
  switch (e.target.innerText) {
    case "=":
      screen.value = calculate(screen.value);
      break;

    case "C":
      screen.value = "";
      break;

    default:
      screen.value += e.target.innerText;
      console.log("no");
      break;
  }
});
