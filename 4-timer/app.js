function preparationTime(timeString) {
  let hours = 0,
    minutes = 0,
    seconds = 0;

  // Ищем часы
  const hourMatch = timeString.match(/(\d+)h/);
  if (hourMatch) {
    hours = parseInt(hourMatch[1], 10);
  }

  // Ищем минуты
  const minuteMatch = timeString.match(/(\d+)m/);
  if (minuteMatch) {
    minutes = parseInt(minuteMatch[1], 10);
  }

  // Ищем секунды
  const secondMatch = timeString.match(/(\d+)s/);
  if (secondMatch) {
    seconds = parseInt(secondMatch[1], 10);
  }

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

const time = "3s";

setTimeout(() => {
  console.log("BEEEP!!!");
}, preparationTime(time));
