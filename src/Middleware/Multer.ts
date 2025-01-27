import multer from "multer";
// Import your Cloudinary utility
const storage = multer.memoryStorage();

const Upload = multer({ storage: storage });
export { Upload };
