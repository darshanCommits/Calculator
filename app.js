const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const screen = document.querySelector(".screen");

let operatorsFn = {
  "+": (x, y) => {return x + y},
  "-": (x, y) => {return x - y},
  "*": (x, y) => {return x * y},
  "/": (x, y) => {return x / y},
  "%": (x, y) => {return x % y},
};
let operators = [...Object.keys(operatorsFn)];

