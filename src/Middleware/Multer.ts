import multer from "multer";

const Storage = multer.memoryStorage()

const Upload = multer({ storage: Storage });

export default Upload;
