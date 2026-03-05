import dedent from "dedent-js";

export const printWeather = (res, icon) => {
  return dedent`[" WEATHER "] Погода в городе ${res.name}
    ${icon}  ${res.weather[0].description}
    Температура: ${res.main.temp}°C (ощущается как ${res.main.feels_like}°C)
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed} м/с`;
};

export const printError = (error) => {
  return "[ ERROR ]" + " " + error;
};
