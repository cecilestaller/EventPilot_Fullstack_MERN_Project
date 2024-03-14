import { User } from "../models/index.js";
import { createToken } from "../utils/jwt.js";

export async function refreshToken(authenticatedUserId) {
  const foundUser = await User.findById(authenticatedUserId);
  if (!foundUser) throw new Error("User not found");
  const newAccessToken = createToken(foundUser, "access");
  return newAccessToken;
}
