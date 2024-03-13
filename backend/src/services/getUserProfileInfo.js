import { User } from "../models/index.js";

export async function getUserProfileInfo(authenticatedUserId) {
  const foundUser = await User.findById(authenticatedUserId);
  if (!foundUser) throw new Error("User doesn't exist");

  return foundUser;
}
