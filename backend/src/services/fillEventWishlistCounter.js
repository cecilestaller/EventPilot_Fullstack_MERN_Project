import { User, Event } from "../models/index.js";

export async function fillEventWishlistCounter(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exists");

    const newWishlistCounter = [...foundEvent.wishlistCounter, foundUser._id];

    const filter = { _id: foundEvent._id };
    const update = { $set: { wishlistCounter: newWishlistCounter } };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
        new: true,
    });

    return {
        eventInfo: updatedEvent,
        wishlistCounterInfo: updatedEvent.wishlistCounter.length,
    };
}
