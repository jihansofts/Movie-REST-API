import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./src/Routes/api.js";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Typescript Express API Run");
});

export default app;
