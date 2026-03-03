module.exports = function calc(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (operator === "add") {
    return num1 + num2;
  }
  if (operator === "sub") {
    return num1 - num2;
  }
  if (operator === "mult") {
    return num1 * num2;
  }
  if (operator === "div") {
    return num1 / num2;
  }
};
