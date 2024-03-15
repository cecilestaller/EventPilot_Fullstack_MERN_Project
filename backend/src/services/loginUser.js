import { User, Event, Review } from "../models/index.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export async function loginUser({ email, password }) {
    // validate login credentials
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new Error("User with this email doesn't exist");

    // check password
    const userPassword = password;
    const passwordMatch = await bcrypt.compare(
        userPassword,
        foundUser.password
    );
    if (!passwordMatch) throw new Error("Wrong password");

    // generate tokens
    const accessToken = createToken(foundUser, "access");
    const refreshToken = createToken(foundUser, "refresh");

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
            user: sanitizedUser,
            eventsHostedByUser: foundEvents,
            reviews: foundReviews,
            avgStarsOfHost: Number(hostStarAvg.toFixed(2)),
            tokens: { accessToken, refreshToken },
        };
    } else if (foundEvents.length > 0 && foundReviews.length === 0) {
        return {
            user: sanitizedUser,
            eventsHostedByUser: foundEvents,
            tokens: { accessToken, refreshToken },
        };
    } else {
        return { user: sanitizedUser, tokens: { accessToken, refreshToken } };
    }
}
