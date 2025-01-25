import jwt from "jsonwebtoken";
import { IUserid } from "../interfaces/IUser.js";
export const CreateToken = (user: IUserid) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
