import { Event } from "../models/index.js";

export async function toggleIsCancelled(authenticatedUserId, eventId) {
  const foundEvent = await Event.findOne({ _id: eventId });
  if (!foundEvent) throw new Error("Event doesn't exist");

  const filter = { _id: eventId };
  const update = { isCancelled: !foundEvent.isCancelled };
  const updatedEvent = await Event.findOneAndUpdate(filter, update, {
    new: true,
  });

  // return updatedEvent;
  return updatedEvent;
}
