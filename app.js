const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const screen = document.querySelector(".screen");

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

// regex either matches a string containing any of the mentioned operators, or number of any length.

let regexPattern = /[+-/*%^]|\d+/g;

// exp will be used as parameter for calculation fn
let exp = "34+79-2*2";

//this converts the stack's element into number but treats the operators as string.
let stack = exp
  .match(regexPattern)
  .map((x) => (/\d+/.test(x) ? parseFloat(x) : x));

//this loop just solves the equation.
let ans = stack[0];
for (let i = 1; i < stack.length; i = i + 2) {
  ans = solve[stack[i]](ans, stack[i + 1]);
  console.log(ans);
}

//now we create event Listeners

