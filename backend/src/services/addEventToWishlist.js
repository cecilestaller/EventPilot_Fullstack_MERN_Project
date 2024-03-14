import { User, Event } from "../models/index.js";

export async function addEventToWishlist(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exists");

    // 1) update User Wishlist (add eventId to userWishlist)
    const newUserWishlist = [...foundUser.userWishlist, foundEvent._id];

    const filter = { _id: foundUser._id };
    const update = { $set: { userWishlist: newUserWishlist } };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
    });

    // 2) update wishlistCounter of Event (add userId to wishlistCounter)
    const newWishlistCounter = [...foundEvent.wishlistCounter, foundUser._id];

    const filterEvent = { _id: foundEvent._id };
    const updateEvent = { $set: { wishlistCounter: newWishlistCounter } };
    const updatedEvent = await Event.findOneAndUpdate(
        filterEvent,
        updateEvent,
        {
            new: true,
        }
    );

    return updatedUser;
}
