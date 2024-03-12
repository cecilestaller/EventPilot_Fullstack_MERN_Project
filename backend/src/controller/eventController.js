import { catchAsync } from "../utils/catchAsync.js";
import { EventService } from "../services/index.js";

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
