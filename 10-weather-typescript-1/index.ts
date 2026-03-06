import express from "express";
import { weatherRouter } from "./weatherRouter/weatherRouter.js";

const port = 8000;
const app = express();

app.use("/city", weatherRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
