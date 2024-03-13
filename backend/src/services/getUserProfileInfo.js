import { User } from "../models/index.js";

export async function getUserProfileInfo(authenticatedUserId) {
  const foundUser = await User.findById(authenticatedUserId);
  if (!foundUser) throw new Error("User doesn't exist");

  const sanitizedUser = {
    _id: foundUser._id,
    userName: foundUser.userName,
    userAddress: {
      city: foundUser.userAddress.city,
      zip: foundUser.userAddress.zip,
      province: foundUser.userAddress.province,
      country: foundUser.userAddress.country,
    },
    bio: foundUser.bio,
    interests: foundUser.interests,
    profilePicURL: foundUser.profilePicURL,
    follower: foundUser.follower,
    following: foundUser.following,
    userWishlist: foundUser.userWishlist,
    registeredEvents: foundUser.registeredEvents,
  };

  return sanitizedUser;
}
