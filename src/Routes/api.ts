import express, { Router, NextFunction } from "express";
import { AuthAdmin, AuthMiddleware } from "../Middleware/AuthMiddleware.js";
import { CreateUser, LoginUser } from "../Controller/UserController.js";
import { CreteCatagory } from "../Controller/MoviesController.js";
const router = Router();

router.post("/resgister", CreateUser as express.RequestHandler);
router.post("/login", LoginUser as express.RequestHandler);
// Movies
router.post(
  "/Catagory",
  AuthAdmin as express.RequestHandler,
  CreteCatagory as express.RequestHandler
);
export default router;
