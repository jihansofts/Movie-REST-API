import mongoose, { Schema, model, Document } from "mongoose";
import { IMovie } from "../interfaces/IMovies.js";
const MovieSchema: Schema = new Schema<IMovie>(
  {
    title: { type: String, required: true, trim: true },
    images: { type: [String], required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "MovieCategory",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Movie = model<IMovie & Document>("Movie", MovieSchema);

export default Movie;
