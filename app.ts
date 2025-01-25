import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./src/Routes/api.js";
import connectDB from "./src/DB/Database.js";
const app = express();
app.use(express.json());
/// Connect to MongoDB
connectDB();
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Typescript Express API Run");
});

export default app;
