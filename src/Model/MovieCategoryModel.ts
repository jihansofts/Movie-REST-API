import mongoose, { Schema, model, Document } from "mongoose";
import { IMovieCategory } from "../interfaces/IMovies.js";
const MovieCategorySchema: Schema = new Schema<IMovieCategory>(
  {
    CategoryName: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);
const MovieCategory = model<IMovieCategory & Document>(
  "movieCategory",
  MovieCategorySchema
);
export default MovieCategory;
