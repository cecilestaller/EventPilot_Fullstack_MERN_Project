import { Event, User } from "../models/index.js";

export async function getAllEvents(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");

    const events = await Event.find();
    return events;
}
