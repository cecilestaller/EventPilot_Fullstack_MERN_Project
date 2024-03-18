import { User, Event } from "../models/index.js";

export async function getUserRegisteredEvents(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    if (foundUser.registeredEvents.length === 0)
        throw new Error("Wishlist of User is empty");

    const registeredEventsArray = foundUser.registeredEvents;
    const foundRegisteredEvents = await Event.find({
        _id: { $in: registeredEventsArray },
    });

    return foundRegisteredEvents;
}
