import express, { Router, NextFunction } from "express";
import { AuthAdmin, AuthMiddleware } from "../Middleware/AuthMiddleware.js";
import { Upload } from "../Middleware/Multer.js";
import { CreateUser, LoginUser } from "../Controller/UserController.js";
import { CreteCatagory, CreateMovie } from "../Controller/MoviesController.js";
const router = Router();

router.post("/resgister", CreateUser as express.RequestHandler);
router.post("/login", LoginUser as express.RequestHandler);
// Movies
router.post(
  "/Catagory",
  AuthAdmin as express.RequestHandler,
  CreteCatagory as express.RequestHandler
);
router.post(
  "/Movie",
  Upload.fields([
    { name: "images", maxCount: 1 },
    { name: "SceenShots", maxCount: 5 },
  ]),
  AuthAdmin as express.RequestHandler,
  CreateMovie as express.RequestHandler
);
export default router;
