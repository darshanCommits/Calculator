const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const input = document.querySelector("input");
const answer = document.querySelector(".answer");
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
  let area = input.offsetHeight * input.offsetWidth;
  let text = input.value.length;
  let fontSize = Math.sqrt(area / text) / 2;

  if (text === 1) fontSize -= 18;
  input.style.fontSize = `${fontSize}px`;
}

container.addEventListener("click", (e) => {
  switch (e.target.innerText) {
    case "=":
      let ans = isNaN(calculate(input.value)) ? ans : calculate(input.value);
      answer.innerText = ans;
      break;

    case "C":
      input.value = "";
      answer.innerText = "";
      break;

    default:
      input.value += e.target.innerText;
      break;
  }

  variableFontSize();
});

document.addEventListener("click", () => {
  input.value = removeDuplicate(input.value);

  if (input.value.match(/(?<=\+)\d+/g)) {
    console.log(1);
    answer.innerText = calculate(input.value);
  }
});

input.addEventListener("keydown", function (event) {
  if (!regexPattern.test(event.key)) {
    event.preventDefault();
  }
});
