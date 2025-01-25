import Mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    let URL = process.env.MONGO_URL || "";
    await Mongoose.connect(URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
