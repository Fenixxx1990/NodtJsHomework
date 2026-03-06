import dedent from "dedent-js";

type Icon = "☀️" | "🌤️" | "☁️" | "🌧️" | "🌦️" | "🌩️" | "❄️" | "🌫️" | undefined;

interface WeatherResponse {
  weather: WeatherCondition[];
  main: MainWeatherData;
  wind: WindData;
  name: string;
}

interface WeatherCondition {
  description: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface WindData {
  speed: number;
}

export const printWeather = (res: WeatherResponse, icon: Icon) => {
  return dedent`[" WEATHER "] Погода в городе ${res.name}
    ${icon}  ${res.weather[0].description}
    Температура: ${res.main.temp}°C (ощущается как ${res.main.feels_like}°C)
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed} м/с`;
};

export const printError = (error: string) => {
  return "[ ERROR ]" + " " + error;
};
