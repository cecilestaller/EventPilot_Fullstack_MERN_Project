import { Event, User } from "../models/index.js";

export async function fillRegisteredGuestsArray(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exists");

    if (foundEvent.fullyBooked === true)
        throw new Error(
            "Event is already fully booked, no more Registrations for this Event possible"
        );

    if (foundEvent.maxGuests > foundEvent.registeredGuests.length) {
        // event not fully booked yet --> userId will be added to registeredGuests Array
        const newRegisteredGuests = [
            ...foundEvent.registeredGuests,
            foundUser._id,
        ];

        const filter = { _id: foundEvent._id };
        const update = { $set: { registeredGuests: newRegisteredGuests } };
        const updatedEvent = await Event.findOneAndUpdate(filter, update, {
            new: true,
        });
        if (updatedEvent.maxGuests === updatedEvent.registeredGuests.length) {
            // after registration of user guest limit reached --> update fullyBooked = true
            const filter = { _id: updatedEvent._id };
            const update = { fullyBooked: true };
            const updatedEventFullyBooked = await Event.findOneAndUpdate(
                filter,
                update,
                { new: true }
            );
            return updatedEventFullyBooked;
        } else {
            return updatedEvent;
        }
    }
}
