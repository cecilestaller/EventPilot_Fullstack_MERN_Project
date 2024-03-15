import { User, Event } from "../models/index.js";

export async function addEventToRegisteredEventsList(
    authenticatedUserId,
    eventId
) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exists");

    if (foundEvent.fullyBooked === true)
        throw new Error(
            "Event is already fully booked, no more Registrations for this Event possible"
        );

    if (foundEvent.maxGuests > foundEvent.registeredGuests.length) {
        // event not fully booked yet --> 1) update Event: userId will be added to registeredGuests Array of Event
        const newRegisteredGuests = [
            ...foundEvent.registeredGuests,
            { userId: foundUser._id, profilePicURL: foundUser.profilePicURL },
        ];

        const filterEvent = { _id: foundEvent._id };
        const updateEvent = { $set: { registeredGuests: newRegisteredGuests } };
        const updatedEvent = await Event.findOneAndUpdate(
            filterEvent,
            updateEvent,
            {
                new: true,
            }
        );
        // 2) update User (add eventId to registeredEvents-Array)
        const newRegisteredEventsList = [
            ...foundUser.registeredEvents,
            foundEvent._id,
        ];

        const filter = { _id: foundUser._id };
        const update = { $set: { registeredEvents: newRegisteredEventsList } };
        const updatedUser = await User.findOneAndUpdate(filter, update, {
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
            return updatedUser;
        } else {
            return updatedUser;
        }
    }
}
