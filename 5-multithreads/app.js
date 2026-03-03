function countDivisibleBy3Simple() {
  const numbers = Array.from({ length: 300000 }, (_, i) => i + 1);
  let count = 0;

  console.time("Простой цикл");
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 3 === 0) {
      count++;
    }
  }
  console.timeEnd("Простой цикл");

  return count;
}

const resultSimple = countDivisibleBy3Simple();
console.log("Количество чисел, делящихся на 3 (простой цикл):", resultSimple);
