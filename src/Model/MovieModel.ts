import mongoose, { Schema, model, Document } from "mongoose";
import { IMovie } from "../interfaces/IMovies.js";
const MovieSchema: Schema = new Schema<IMovie>(
  {
    title: { type: String, required: true, trim: true },
    images: [{ publicid: String, url: String }],
    description: { type: String, required: true, trim: true },
    dowloadlink: { type: String, required: true, trim: true },
    steamLink: { type: String, required: true, trim: true },
    sceenShots: [{ publicid: String, url: String }],
    movieCategory: [
      { type: mongoose.Schema.Types.ObjectId },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Movie = model<IMovie & Document>("Movie", MovieSchema);

export default Movie;
