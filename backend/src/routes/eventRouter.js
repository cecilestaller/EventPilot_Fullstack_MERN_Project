import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { EventController } from "../controller/index.js";

export const eventRouter = express
    .Router()
    .post("/", doJwtAuth, EventController.postNewEventCtrl);
