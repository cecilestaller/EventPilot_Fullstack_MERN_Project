import { User, Event, Review } from "../models/index.js";

export async function getUserProfileInfo(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");
    // check if user is host of events
    const foundEvents = await Event.find({ hostId: foundUser._id });

    // check if user as host has reviews
    const foundReviews = await Review.find({ hostId: foundUser._id });
    // calculate average Star rating of host
    const hostStarAvg =
        foundReviews
            .map((review) => review.stars)
            .reduce((acc, element) => {
                return acc + element;
            }, 0) / foundReviews.length;

    const sanitizedUser = {
        _id: foundUser._id,
        userName: foundUser.userName,
        userAddress: {
            city: foundUser.userAddress.city,
            zip: foundUser.userAddress.zip,
            province: foundUser.userAddress.province,
            country: foundUser.userAddress.country,
        },
        bio: foundUser.bio,
        interests: foundUser.interests,
        profilePicURL: foundUser.profilePicURL,
        follower: foundUser.follower,
        following: foundUser.following,
        userWishlist: foundUser.userWishlist,
        registeredEvents: foundUser.registeredEvents,
    };

    if (foundEvents.length > 0 && foundReviews.length > 0) {
        return {
            userDetails: sanitizedUser,
            eventsHostedByUser: foundEvents,
            reviews: foundReviews,
            avgStarsOfHost: Number(hostStarAvg.toFixed(2)),
        };
    } else if (foundEvents.length > 0 && foundReviews.length === 0) {
        return {
            userDetails: sanitizedUser,
            eventsHostedByUser: foundEvents,
        };
    } else {
        return { userDetails: sanitizedUser };
    }
}
