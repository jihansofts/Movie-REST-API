import express, { Request, Response } from "express";
import MovieCategory from "../Model/MovieCategoryModel.js";
import {
  CreateService,
  UpdateService,
} from "../Services/common/CreaateUpdateServeces.js";
import { DeleteCategoryService } from "../Services/common/DeleteServices.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";
const CreteCategory = async (req: Request, res: Response) => {
  try {
    const Data = await CreateService(req, MovieCategory);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to create Category"));
  }
};
const UpdateCategory = async (req: Request, res: Response) => {
  try {
    const Data = await UpdateService(req, MovieCategory);
    return res.status(Data.statusCode).json(Data);
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to update Category"));
  }
};
const DeleteCategory = async (req: Request, res: Response) => {
  try {
    const response = await DeleteCategoryService(req, MovieCategory);
    if (response) {
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    res.json(ResponseHelper.error(402, "Failed to delete Category"));
  }
};

export { CreteCategory, UpdateCategory, DeleteCategory };
