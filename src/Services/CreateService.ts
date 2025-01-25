import { Request } from "express";
import { CreateToken } from "../Utility/CreateToken.js";
import { ResponseHelper } from "../Utility/ResponseHelper.js";
import User, { IUserDocument } from "../Model/UserModel.js";
import { IResponse } from "../interfaces/IResponse.js";
import { IUserid } from "../interfaces/IUser.js";
const CreateService = async (req: Request): Promise<IResponse> => {
  try {
    const user = await User.create(req.body);
    return ResponseHelper.success(201, "User created successfully", user);
  } catch (error) {
    return ResponseHelper.error(400, "Failed to create");
  }
};
const UserLogin = async (req: Request): Promise<IResponse> => {
  try {
    // Validate that the body contains 'email' and 'password'
    if (!req.body || !req.body.email || !req.body.password) {
      return ResponseHelper.error(400, "Missing email or password");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return ResponseHelper.error(404, "User not found");
    }
    if (user.password !== req.body.password) {
      return ResponseHelper.error(401, "Email or Invalid password");
    }
    user.refeshToken = CreateToken({ id: user._id } as IUserid);
    await user.save();
    return ResponseHelper.success(200, "User logged in successfully", user);
  } catch (error) {
    return ResponseHelper.error(400, "Failed to Login user");
  }
};

export { CreateService, UserLogin };
