import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { ReviewController } from "../controller/index.js";

export const reviewRouter = express
    .Router()
    .post("/:hostId", doJwtAuth, ReviewController.postNewReviewCtrl);
