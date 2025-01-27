import mongoose, { Schema, model, Document } from "mongoose";
import { IUser } from "../interfaces/IUser.js";
export interface IUserDocument extends Document, IUser {}
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    refeshToken: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const User = model<IUserDocument>("User", UserSchema);
export default User;
