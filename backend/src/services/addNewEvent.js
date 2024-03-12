import { User, Event } from "../models/index.js";

export async function addNewEvent(authenticatedUserId, eventInfo) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    const newEvent = await Event.create({
        ...eventInfo,
        hostId: foundUser._id,
    });

    return newEvent;
}
