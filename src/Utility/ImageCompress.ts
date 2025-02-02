import DataURIParser from "datauri/parser.js";
import path from "path";
const getDataUrl = (images: Express.Multer.File) => {
  const parser = new DataURIParser();
  const extname = path.extname(images.originalname).toString();
  return parser.format(extname, images.buffer);
};

export { getDataUrl };
