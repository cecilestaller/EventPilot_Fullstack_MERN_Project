import { User, Event } from "../models/index.js";

export async function editEvent(authenticatedUserId, eventEditInfo, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist!");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exist");

    // check if user is host of event
    const userEqualHost =
        foundEvent.hostId.toString() === foundUser._id.toString();
    if (!userEqualHost)
        throw new Error("Users can only edit Events they created!");

    // make sure eventEditInfo doesn't include hostId (hostId shouldn't be updated!)
    const eventEditInfoNoHostId = { ...eventEditInfo };
    delete eventEditInfoNoHostId.hostId;

    const filter = { _id: foundEvent._id };
    const update = { $set: eventEditInfoNoHostId };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
        new: true,
    });

    return updatedEvent;
}
