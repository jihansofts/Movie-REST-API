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
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
const AuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUserid;

    const user = (await User.findById(decoded.id)) as IUserDocument;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized user" });
    }

    if (user.isAdmin !== true) {
      return res
        .status(403)
        .json({ success: false, error: "Admin access denied" });
    }

    // Attach user to the request for use in controllers
    (req as any).user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

// const AuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "token not found" });
//     }
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as IUserid;
//     const user = (await User.findById(decoded.id)) as IUserDocument;
//     if (!user) {
//       return res.status(401).json({ error: "User Unauthorized" });
//     }
//     if (user.isAdmin !== "ADMIN") {
//       return res.status(401).json({ error: "Admin Unauthorized" });
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Admin Unauthorized" });
//   }
// };

export { AuthMiddleware, AuthAdmin };
