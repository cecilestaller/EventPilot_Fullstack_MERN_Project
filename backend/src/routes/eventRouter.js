import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { EventController } from "../controller/index.js";

export const eventRouter = express
  .Router()
  .get("/", doJwtAuth, EventController.getAllEventsCtrl)
  .get("/:eventId", doJwtAuth, EventController.getEventDetailsCtrl)
  .post("/", doJwtAuth, EventController.postNewEventCtrl)
  .patch(
    "/register/:eventId",
    doJwtAuth,
    EventController.patchFillRegisteredGuestCheckFullyBookedCtrl
  )
  .patch(
    "/toggleCancelled/:eventId",
    doJwtAuth,
    EventController.patchEventIsCancelledCtrl
  );
