import { User } from "../models/index.js";

export async function addEventToRegisteredEventsList(
  authenticatedUserId,
  eventId
) {
  const foundUser = await User.findById(authenticatedUserId);
  if (!foundUser) throw new Error("User doesn't exist");

  const newRegisteredEventsList = [...foundUser.registeredEvents, eventId];

  const filter = { _id: foundUser._id };
  const update = { $set: { registeredEvents: newRegisteredEventsList } };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser;
}
