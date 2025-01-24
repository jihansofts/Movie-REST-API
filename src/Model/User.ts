import mongoose, { Schema, model, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";
export interface IUserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);
export default model<IUserDocument>("User", UserSchema);
