import { User, Event } from "../models/index.js";

export async function removeEventFromWishlist(authenticatedUserId, eventId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");

    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) throw new Error("Event doesn't exists");

    // 1) update User Wishlist (remove eventId from userWishlist)

    const filter = { _id: foundUser._id };
    const update = { $pull: { userWishlist: foundEvent._id } };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
    });

    // 2) update wishlistCounter of Event (remove userId from wishlistCounter)

    const filterEvent = { _id: foundEvent._id };
    const updateEvent = { $pull: { wishlistCounter: foundUser._id } };
    const updatedEvent = await Event.findOneAndUpdate(
        filterEvent,
        updateEvent,
        {
            new: true,
        }
    );

    return updatedUser;
}
