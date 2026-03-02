const { firstNum, secondNum, operator } = require("../add");

const EventEmmiter = require("events");
const myEmmiter = new EventEmmiter();

let num1 = parseFloat(firstNum);
let num2 = parseFloat(secondNum);

myEmmiter.on("result", (result) => console.log(result));

myEmmiter.on("add", (num1, num2) => {
  myEmmiter.emit("result", num1 + num2);
});
myEmmiter.on("sub", (num1, num2) => {
  myEmmiter.emit("result", num1 - num2);
});
myEmmiter.on("mult", (num1, num2) => {
  myEmmiter.emit("result", num1 * num2);
});
myEmmiter.on("div", (num1, num2) => {
  myEmmiter.emit("result", num1 / num2);
});

myEmmiter.emit(operator, num1, num2);
