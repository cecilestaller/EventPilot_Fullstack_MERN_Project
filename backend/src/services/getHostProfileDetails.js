import { User, Review, Event } from "../models/index.js";

export async function getHostProfileDetails(authenticatedUserId, hostId) {
    // find User
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");
    // find Host
    const foundHost = await User.findById(hostId);
    if (!foundHost) throw new Error("Host doesn't exist anymore");
    // find All Events of Host
    const foundEventsOfHost = await Event.find({ hostId: foundHost._id });
    if (foundEventsOfHost.length === 0)
        throw new Error("There are no Events hosted by User" + hostId);
    // find All Reviews of Host
    const foundReviews = await Review.find({ hostId: foundHost._id });
    // calculate average Star rating of host
    const hostStarAvg =
        foundReviews
            .map((review) => review.stars)
            .reduce((acc, element) => {
                return acc + element;
            }, 0) / foundReviews.length;

    return {
        hostDetails: foundHost,
        allEventsOfHost: foundEventsOfHost,
        allReviewsAboutHost: foundReviews,
        avgStarsOfHost: Number(hostStarAvg.toFixed(2)),
    };
}
