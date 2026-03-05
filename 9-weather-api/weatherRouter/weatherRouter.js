import express from "express";
import { getIcon, getWeather } from "../services/api.service.js";
import { printWeather } from "../services/log.service.js";

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
  } catch (e) {
    if (e?.response?.status === 404) {
      res.send(printError("Неверно указан город"));
    } else if (e?.response?.status === 401) {
      res.send(printError("Неверно указан токен"));
    } else {
      res.send(printError(e.message));
    }
  }
});
