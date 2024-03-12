import express from "express";
import { UserController } from "../controller/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
// import doJwtAuth

export const userRouter = express
    .Router()
    .post("/signup", UserController.postSignUpUserCtrl)
    .post("/login", UserController.postLoginUserCtrl)
    .post("/refreshtoken", doJwtAuth, UserController.postRefreshtokenCtrl);
