import mongoose from "mongoose";
import { Request } from "express";
import Movie from "../../Model/MovieModel.js";
import { ResponseHelper } from "../../Utility/ResponseHelper.js";
import { DeleteSingle } from "../../Helper/UploadFile.js";
const DeleteCategoryService = async (
  req: Request,
  data: mongoose.Model<any>
) => {
  try {
    const exitCategory = await data.findById(req.params.id);
    if (!exitCategory) return ResponseHelper.error(400, "No category found");
    const AssoiateMovie = await Movie.countDocuments({
      Category: req.params.id,
    });
    if (AssoiateMovie > 0) {
      return ResponseHelper.error(400, "Category is associated with movies");
    }
    let result = await data.findByIdAndDelete(req.params.id);
    return ResponseHelper.success(200, "Category deleted successfully", result);
  } catch (error) {
    return ResponseHelper.error(400, "Failed to delete category");
  }
};
const DeleteMovieService = async (req: Request, data: mongoose.Model<any>) => {
  try {
    const exitMovie = await data.findById(req.params.id);
    if (!exitMovie) return ResponseHelper.error(400, "No movie found");
    if (exitMovie.images[0]) {
      await DeleteSingle(exitMovie.images[0].url);
    }
    if (exitMovie.sceenShots[0]) {
      await Promise.all(
        exitMovie.sceenShots.map(async (image: any) => {
          await DeleteSingle(image.url);
        })
      );
    }
    let result = await data.findByIdAndDelete(req.params.id);
    return ResponseHelper.success(200, "Movie deleted successfully", result);
  } catch (error) {
    return ResponseHelper.error(400, "Failed to delete movie");
  }
};
export { DeleteCategoryService, DeleteMovieService };
