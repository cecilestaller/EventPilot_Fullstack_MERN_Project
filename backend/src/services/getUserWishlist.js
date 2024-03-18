import { User, Event } from "../models/index.js";

export async function getUserWishlist(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    if (foundUser.userWishlist.length === 0)
        throw new Error("Wishlist of User is empty");

    const wishlistArray = foundUser.userWishlist;
    const foundEventsOnWishlist = await Event.find({
        _id: { $in: wishlistArray },
    });

    return foundEventsOnWishlist;
}
