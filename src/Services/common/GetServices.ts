import mongoose from "mongoose";
import { Request } from "express";
import { ResponseHelper } from "../../Utility/ResponseHelper.js";

const GetService = async (req: Request, data: mongoose.Model<any>) => {
  try {
    const result = await data.find();
    return ResponseHelper.success(200, "Success", result);
  } catch (error) {
    console.log(error);
    return ResponseHelper.error(400, "Failed to get all data");
  }
};

export { GetService };