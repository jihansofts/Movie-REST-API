import cloudinary from "../Utility/Cloudinary.js";
import fs from "fs";

// const UploadSingle = async (file: any) => {
//   try {
//     if (!file) {
//       throw new Error("File is required for upload.");
//     }
//     const result = await cloudinary.uploader.upload(file);
//     return result;
//   } catch (error) {
//     console.log("Error uploading files:");
//     throw error;
//   }
// };

// const UploadMultiple = async (files: any) => {
//   try {
//     if (!Array.isArray(files)) {
//       throw new Error("The input must be an array of files.");
//     }
//     const validFiles = files.filter(
//       (file: any) => file !== null && file !== undefined
//     );

//     if (validFiles.length === 0) {
//       throw new Error("No valid files to upload.");
//     }

//     const results = await Promise.all(
//       validFiles.map((file: any) => cloudinary.uploader.upload(file))
//     );

//     return results;
//   } catch (error) {
//     console.log("Error uploading files:");
//     throw error;
//   }
// };
const UploadFile = async (LocalFilePath: any) => {
  try {
    if (!LocalFilePath) return null;
    const result = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
      folder: "Movies",
    });
    result.url;
    console.log(result, "result");
    return result;
  } catch (error) {
    fs.unwatchFile(LocalFilePath);
    console.log(error, "Upload Error");
    return null;
  }
};

export { UploadFile };

// import cloudinary from "../Utility/Cloudinary.js";

// const UploadSingle = async (file: any) => {
//   try {
//     const result = await cloudinary.uploader.upload(file);
//     return result;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };
// const UploadMultiple = async (files: any) => {
//   try {
//     const results = await Promise.all(
//       files.map((file: any) => cloudinary.uploader.upload(file))
//     );
//     return results;
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     throw error;
//   }
// };
// export { UploadSingle, UploadMultiple };
