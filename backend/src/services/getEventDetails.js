import { Event, User } from "../models/index.js";

export async function getEventDetails(authenticatedUserId, eventId) {
  const foundEvent = await Event.findOne({
    hostId: authenticatedUserId,
    _id: eventId,
  });
  if (!foundEvent) throw new Error("Could not find event");

  const foundHost = await User.findById({ _id: authenticatedUserId });
  if (!foundHost) throw new Error("Could not find host for this event");

  return { eventDetails: foundEvent, host: foundHost };
}
