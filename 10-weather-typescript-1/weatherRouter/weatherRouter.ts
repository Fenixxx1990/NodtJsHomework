import express from "express";
import { getIcon, getWeather } from "../services/api.service.js";
import { printWeather, printError } from "../services/log.service.js";
import axios, { AxiosError } from "axios";

export const weatherRouter = express.Router();

// userRouter.use((req, res, next) => {
//   const city = req.path.split("/").filter((part) => part !== "")[0];
//   return city;
// });
weatherRouter.get("/:cityName", async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const weather = await getWeather(cityName);
    res.send(printWeather(weather, getIcon(weather.weather[0].icon)));
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;

      if (error.response?.status === 404) {
        res.send(printError("Неверно указан город"));
      } else if (error.response?.status === 401) {
        res.send(printError("Неверно указан токен"));
      } else {
        res.send(printError(error.message || "Произошла ошибка"));
      }
    } else if (e instanceof Error) {
      res.send(printError(e.message));
    } else {
      res.send(printError("Произошла неизвестная ошибка"));
    }
  }
});
