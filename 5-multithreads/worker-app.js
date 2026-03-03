const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const os = require("os");

if (isMainThread) {
  // Основной поток
  async function main() {
    const numCores = os.cpus().length;
    console.log(`Число ядер процессора: ${numCores}`);

    // Генерируем массив
    const numbers = Array.from({ length: 300000 }, (_, i) => i + 1);

    // Разбиваем массив на части
    const chunkSize = Math.ceil(numbers.length / numCores);
    const chunks = [];
    for (let i = 0; i < numbers.length; i += chunkSize) {
      chunks.push(numbers.slice(i, i + chunkSize));
    }

    console.time("Параллельная обработка");

    // Создаём воркеров для каждой части
    const workerPromises = chunks.map((chunk) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
          workerData: chunk,
        });

        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });
    });

    // Ждём результатов от всех воркеров
    const results = await Promise.all(workerPromises);
    const totalCount = results.reduce((sum, count) => sum + count, 0);

    console.timeEnd("Параллельная обработка");
    console.log(
      "Количество чисел, делящихся на 3 (параллельная обработка):",
      totalCount,
    );
  }

  main().catch(console.error);
} else {
  // Код воркера
  const { workerData } = require("worker_threads");

  // Считаем количество чисел, делящихся на 3 в своём чанке
  let count = 0;
  for (const num of workerData) {
    if (num % 3 === 0) {
      count++;
    }
  }

  // Отправляем результат обратно в основной поток
  parentPort.postMessage(count);
}
