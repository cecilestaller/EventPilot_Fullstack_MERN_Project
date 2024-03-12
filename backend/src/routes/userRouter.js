import express from "express";
import { UserController } from "../controller/index.js";
// import makeJwtAuth

export const userRouter = express
    .Router()
    .post("/signup", UserController.postSignUpUserCtrl);
