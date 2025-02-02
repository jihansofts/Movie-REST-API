import express, { Request, Response } from "express";
import Movie from "../Model/MovieModel.js";
import {
  CreateMovieServices,
  UpdateMovieService,
} from "../Services/common/CreaateUpdateServeces.js";
import { DeleteMovieService } from "../Services/common/DeleteServices.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";
const CreateMovie = async (req: Request, res: Response) => {
  try {
    const Data = await CreateMovieServices(req, Movie);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to create Movie"));
  }
};
const UpdateMovie = async (req: Request, res: Response) => {
  try {
    const Data = await UpdateMovieService(req, Movie);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to update Movie"));
  }
};
const DeleteMovie = async (req: Request, res: Response) => {
  try {
    const response = await DeleteMovieService(req, Movie);
    if (response) {
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to delete Movie"));
  }
};
export { CreateMovie, UpdateMovie, DeleteMovie };
