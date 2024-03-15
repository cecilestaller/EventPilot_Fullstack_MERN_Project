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
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const result = await EventService.getAllEvents(authenticatedUserId);
        res.status(200).json({ success: true, result });
    },
    { message: "Coult not retrieve events" }
);

// ==== Get event details ====
export const getEventDetailsCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const eventId = req.params.eventId;
        const result = await EventService.getEventDetails(
            authenticatedUserId,
            eventId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not retrieve event details" }
);

// ==== Patch event is cancelled ====
export const patchEventIsCancelledCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const eventId = req.params.eventId;
        const result = await EventService.toggleIsCancelled(
            authenticatedUserId,
            eventId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not update event's cancel status" }
);

// ==== EDIT EVENT =====
export const patchEditEventCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const eventEditInfo = req.body;
        const eventId = req.params.eventId;
        const result = await EventService.editEvent(
            authenticatedUserId,
            eventEditInfo,
            eventId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not edit Event" }
);
