import mongoose from "mongoose";
import { Request } from "express";
import { IResponse } from "../../interfaces/IResponse.js";
import { UploadFile } from "../../Helper/UploadFile.js";
import { ResponseHelper } from "../../Utility/ResponseHelper.js";
const CreateServices = async (
  req: Request,
  data: mongoose.Model<any>
): Promise<IResponse> => {
  try {
    const imagePath = req.file?.path;
    console.log(imagePath, "path");
    const newImage = (await UploadFile(imagePath)) as any;
    let images = newImage;
    const postBody = {
      ...req.body,
      images, 
    };
    const document = await data.create(postBody);
    return ResponseHelper.success(201, "Created successfully", document);
  } catch (error) {
    console.error("Error during creation:", error);
    return ResponseHelper.error(400, "Failed to create resource");
  }
};

export { CreateServices };
