import { catchAsync } from "../utils/catchAsync.js";
import { EventService } from "../services/index.js";

// ==== Add event ====
export const postNewEventCtrl = catchAsync(
  async (req, res) => {
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const eventInfo = req.body;
    const result = await EventService.addNewEvent(
      authenticatedUserId,
      eventInfo
    );
    res.status(201).json({ success: true, result });
  },
  { message: "Could not create new Event" }
);

// ==== View all events ====
export const getAllEventsCtrl = catchAsync(
  async (req, res) => {
    // const authenticatedUserId = req.verifiedUserClaims.sub;
    const result = await EventService.getAllEvents();
    // const result = await EventService.getAllEvents(authenticatedUserId);
    res.status(200).json({ success: true, result });
  },
  { message: "Coult not retrieve events" }
);
