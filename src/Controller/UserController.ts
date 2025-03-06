import { Request, Response } from "express";
import {
  CreateService,
  UserLogin,
  UpdateUserService,
} from "../Services/Users/UserCreateService.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";
const CreateUser = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return ResponseHelper.error(400, "Missing email or password");
    }
    const user = await CreateService(req);
    return res.status(user.statusCode).json(user);
  } catch (error) {
    res.json(ResponseHelper.error(401, "Failed to create user"));
  }
};
const LoginUser = async (req: Request, res: Response) => {
  try {
    const user = await UserLogin(req);
    return res.status(user.statusCode).json(user);
  } catch (error) {
    res.json(ResponseHelper.error(400, "Failed to Login user"));
  }
};
const UpdateUser = async (req: Request, res: Response) => {
  try {
    const user = await UpdateUserService(req);
    return res.status(user.statusCode).json(user);
  } catch (error) {
    res.json(ResponseHelper.error(400, "Failed to update user"));
  }
};
export { CreateUser, LoginUser, UpdateUser };
