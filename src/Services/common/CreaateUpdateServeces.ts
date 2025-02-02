import mongoose from "mongoose";
import { Request } from "express";
import { IResponse } from "../../interfaces/IResponse.js";
import { UploadFile, DeleteSingle } from "../../Helper/UploadFile.js";
import { getDataUrl } from "../../Utility/ImageCompress.js";
import { ResponseHelper } from "../../Utility/ResponseHelper.js";
const CreateMovieServices = async (
  req: Request,
  data: mongoose.Model<any>
): Promise<IResponse> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const images = files["images"] || [];
    const screenshots = files["sceenShots"] || [];
    const SingleImage = getDataUrl(images[0]);
    const imageSingle = await UploadFile(SingleImage.content);
    const imageObj = {
      url: imageSingle?.url,
      public_id: imageSingle?.public_id,
    };
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < screenshots.length; i += batchSize) {
      const batch = screenshots.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map((image) => {
          const url = getDataUrl(image);
          return UploadFile(url.content);
        })
      );
      batches.push(...results);
    }
    const imageMulti = batches;
    const PosBody = {
      ...req.body,
      images: imageObj,
      sceenShots: imageMulti,
    };
    const document = await data.create(PosBody);
    return ResponseHelper.success(201, "Created successfully", document);
  } catch (error) {
    console.error("Error during creation:", error);
    return ResponseHelper.error(400, "Failed to create resource");
  }
};
const UpdateMovieService = async (req: Request, data: mongoose.Model<any>) => {
  try {
    const exitDocument = await data.findById(req.params.id);
    if (!exitDocument) return ResponseHelper.error(400, "No document found");
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const images = files["images"] || [];
    const screenshots = files["sceenShots"] || [];
    // Handle single image update
    let imageSingle = exitDocument.images[0]?.url; // Keep the existing image if no new image is provided
    if (images[0]) {
      const SingleImage = getDataUrl(images[0]);
      if (exitDocument.images[0]) {
        await DeleteSingle(exitDocument.images[0].url); // Delete the old image
      }
      imageSingle = await UploadFile(SingleImage.content); // Upload the new image
    }
    // Handle screenshots update
    let newScreenshots = exitDocument.sceenShots; // Keep the existing screenshots if no new ones are provided
    if (screenshots.length > 0) {
      // Delete old screenshots
      if (exitDocument.sceenShots.length > 0) {
        await Promise.all(
          exitDocument.sceenShots.map(async (image: any) => {
            await DeleteSingle(image.url);
          })
        );
      }
      // Upload new screenshots
      newScreenshots = await Promise.all(
        screenshots.map(async (file: Express.Multer.File) => {
          const screenshotData = getDataUrl(file);
          const uploadedScreenshot = await UploadFile(screenshotData.content);
          return {
            url: uploadedScreenshot?.secure_url || "", // Use the secure_url from Cloudinary
            _id: new mongoose.Types.ObjectId(), // new _id for the screenshot
          };
        })
      );
    }
    // Update the document
    const document = await data.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: imageSingle
          ? [
              {
                url: imageSingle.secure_url,
                _id: new mongoose.Types.ObjectId(),
              },
            ]
          : exitDocument.images,
        sceenShots: newScreenshots,
      },
      {
        new: true,
      }
    );

    return ResponseHelper.success(200, "Updated successfully", document);
  } catch (error) {
    console.error("Error during update:", error);
    return ResponseHelper.error(400, "Failed to update resource");
  }
};
// const UpdateMovieService = async (req: Request, data: mongoose.Model<any>) => {
//   try {
//     const exitDocument = await data.findById(req.params.id);
//     if (!exitDocument) return ResponseHelper.error(400, "No document found");
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//     const images = files["images"] || [];
//     const screenshots = files["sceenShots"] || [];
//     const SingleImage = getDataUrl(images[0]);
//     const imageSingle = await UploadFile(SingleImage.content);
//     if (exitDocument.images[0]) {
//       if (files["images"]) {
//         await DeleteSingle(exitDocument.images[0].url);
//       }
//     }
//     if (exitDocument.sceenShots[0]) {
//       if (files["sceenShots"]) {
//         await Promise.all(
//           exitDocument.sceenShots.map(async (image: any) => {
//             await DeleteSingle(image.url);
//           })
//         );
//       }
//     }
//     const document = await data.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         images: imageSingle,
//         sceenShots: screenshots,
//       },
//       {
//         new: true,
//       }
//     );
//     return ResponseHelper.success(200, "Updated successfully", document);
//   } catch (error) {
//     console.error("Error during update:", error);
//     return ResponseHelper.error(400, "Failed to update resource");
//   }
// };
const CreateService = async (req: Request, data: mongoose.Model<any>) => {
  try {
    const document = await data.create(req.body);
    return ResponseHelper.success(201, "Created successfully", document);
  } catch (error) {
    console.error("Error during creation:", error);
    return ResponseHelper.error(400, "Already exist to create resource");
  }
};
const UpdateService = async (req: Request, data: mongoose.Model<any>) => {
  try {
    const document = await data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return ResponseHelper.success(200, "Updated successfully", document);
  } catch (error) {
    console.error("Error during update:", error);
    return ResponseHelper.error(400, "Failed to update resource");
  }
};
export {
  CreateMovieServices,
  CreateService,
  UpdateService,
  UpdateMovieService,
};
