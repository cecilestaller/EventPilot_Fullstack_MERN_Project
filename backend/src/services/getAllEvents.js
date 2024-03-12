import { Event } from "../models/index.js";

export async function getAllEvents() {
  const events = await Event.find();
  return events;
}
// export async function getAllEvents(authenticatedUserId) {
//   const events = await Event.find({ userId: authenticatedUserId });
//   return events;
// }
