import cloudinary from "../Utility/Cloudinary.js";
import fs from "fs";

const UploadFile = async (LocalFilePath: any) => {
  try {
    if (!LocalFilePath) return null;
    const result = await cloudinary.uploader.upload(LocalFilePath as string, {
      resource_type: "image",
      folder: "Portfolio",
    });
    return result;
  } catch (error) {
    fs.unwatchFile(LocalFilePath as string);
    console.log(error, "Upload Error");
    return null;
  }
};
const extractPublicId = (imageUrl: string): string => {
  const parts = imageUrl.split("/");
  const folderIndex = parts.indexOf("Portfolio");
  if (folderIndex !== -1) {
    // Include the folder name in the public_id
    return (
      parts.slice(folderIndex, parts.length - 1).join("/") +
      "/" +
      parts[parts.length - 1].split(".")[0]
    );
  }
  return parts[parts.length - 1].split(".")[0];
};
const DeleteSingle = async (ImageURL: any) => {
  try {
    let publicId = extractPublicId(ImageURL);
    let result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log(error, "Delete Error");
  }
};



export { UploadFile, DeleteSingle,  };
