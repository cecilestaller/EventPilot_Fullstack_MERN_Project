import mongoose from "mongoose";
import { Event, User } from "../models/index.js";

export async function addEventToWishlist(authenticatedUserId, eventId) {
  const foundUser = await User.findById(authenticatedUserId);
  if (!foundUser) throw new Error("User doesn't exist");

  const newUserWishlist = [...foundUser.userWishlist, eventId];

  const filter = { _id: foundUser._id };
  const update = { $set: { userWishlist: newUserWishlist } };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser;
}
