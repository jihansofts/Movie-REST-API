import express, { Request, Response } from "express";
import { IMovie } from "../interfaces/IMovies.js";
import { CreateService } from "../Services/CreateService.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";

const CreteCatagory = async (req: Request, res: Response) => {
  try {
    const Data = await CreateService(req);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to create user"));
  }
};
export { CreteCatagory };
