import { Event, User } from "../models/index.js";

export async function toggleIsCancelled(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist!");

    const foundEvent = await Event.findOne({
        _id: eventId,
        hostId: foundUser._id,
    });
    if (!foundEvent) throw new Error("Event doesn't exist");

    const filter = { _id: eventId, hostId: foundUser._id };
    const update = { isCancelled: !foundEvent.isCancelled };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
        new: true,
    });

    // return updatedEvent;
    return updatedEvent;
}
