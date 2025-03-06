import express, { Router } from "express";
import { AuthAdmin, AuthMiddleware } from "../Middleware/AuthMiddleware.js";
import Upload from "../Middleware/Multer.js";
import {
  CreateUser,
  LoginUser,
  UpdateUser,
} from "../Controller/UserController.js";
import {
  CreteCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
} from "../Controller/CategoryController.js";
import {
  CreateMovie,
  UpdateMovie,
  DeleteMovie,
} from "../Controller/MoviesController.js";
const router = Router();

router.post("/resgister", CreateUser as express.RequestHandler);
router.post("/login", LoginUser as express.RequestHandler);
router.put(
  "/update/:id",
  AuthMiddleware as express.RequestHandler,
  UpdateUser as express.RequestHandler
);
// Category
router.post(
  "/CreateCategory",
  AuthAdmin as express.RequestHandler,
  CreteCategory as express.RequestHandler
);
router.get("/GetCategory", GetCategory as express.RequestHandler);
router.put(
  "/UpdateCategory/:id",
  AuthAdmin as express.RequestHandler,
  UpdateCategory as express.RequestHandler
);
router.delete(
  "/DeleteCategory/:id",
  AuthAdmin as express.RequestHandler,
  DeleteCategory as express.RequestHandler
);
// Movies
router.post(
  "/CreateMovie",
  Upload.fields([{ name: "images" }, { name: "sceenShots" }]),
  AuthAdmin as express.RequestHandler,
  CreateMovie as express.RequestHandler
);
router.put(
  "/UpdateMovie/:id",
  Upload.fields([{ name: "images" }, { name: "sceenShots" }]),
  AuthAdmin as express.RequestHandler,
  UpdateMovie as express.RequestHandler
);
router.delete(
  "/DeleteMovie/:id",
  AuthAdmin as express.RequestHandler,
  DeleteMovie as express.RequestHandler
);

export default router;
