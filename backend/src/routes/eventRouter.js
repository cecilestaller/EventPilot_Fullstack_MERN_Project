import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { EventController } from "../controller/index.js";

export const eventRouter = express
  .Router()
  .get("/", EventController.getAllEventsCtrl)
  // .get("/", doJwtAuth, EventController.getAllEventsCtrl)
  .post("/", doJwtAuth, EventController.postNewEventCtrl);
