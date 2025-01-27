import express, { Request, Response } from "express";
import MovieCategory from "../Model/MovieCategoryModel.js";
import Movie from "../Model/MovieModel.js";
import { CreateServices } from "../Services/common/CreaateServoces.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";

const CreteCatagory = async (req: Request, res: Response) => {
  try {
    const Data = await CreateServices(req, MovieCategory);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to create Category"));
  }
};
const CreateMovie = async (req: Request, res: Response) => {
  try {
    const Data = await CreateServices(req, Movie);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to create Movie"));
  }
};
export { CreteCatagory, CreateMovie };
