import mongoose, { Schema, model, Document } from "mongoose";
import { IMovieCategory } from "../interfaces/IMovies.js";
const MovieCategorySchema: Schema = new Schema<IMovieCategory>(
  {
    CategoryName: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);
const MovieCategory = model<IMovieCategory & Document>(
  "Category",
  MovieCategorySchema
);
export default MovieCategory;
