import { Request, Response, NextFunction } from "express";
import User, { IUserDocument } from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import { IUserid } from "../interfaces/IUser.js";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUserid;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const AuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Admin Unauthorized" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUserid;
    const user = (await User.findById(decoded.id)) as IUserDocument;
    if (!user) {
      return res.status(401).json({ error: "Admin Unauthorized" });
    }
    if (!user.isAdmin && user.isAdmin === false) {
      return res.status(401).json({ error: "Admin Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Admin Unauthorized" });
  }
};

export { AuthMiddleware, AuthAdmin };
