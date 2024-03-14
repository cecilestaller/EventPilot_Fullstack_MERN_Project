import { Event, User, Review } from "../models/index.js";

export async function getEventDetails(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");
    // find Event
    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Could not find event" + eventId);
    // find Host of this Event
    const foundHost = await User.findById({ _id: foundEvent.hostId });
    if (!foundHost) throw new Error("Could not find host for this event");
    // find all reviews of host
    const foundReviews = await Review.find({ hostId: foundHost._id });

    const hostStarAvg =
        foundReviews
            .map((review) => review.stars)
            .reduce((acc, element) => {
                return acc + element;
            }, 0) / foundReviews.length;

    return {
        eventDetails: foundEvent,
        amountRegisteredGuests: foundEvent.registeredGuests.length,
        eventOnWishlists: foundEvent.wishlistCounter.length,
        host: foundHost,
        avgStarsOfHost: Number(hostStarAvg.toFixed(2)),
    };
}
