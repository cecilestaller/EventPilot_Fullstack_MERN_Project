import { User } from "../models/index.js";

// userService.js

export async function editUserProfile(authenticatedUserId, userProfileInfo) {
  try {
    // Prüfen, ob im userProfileInfo gelöschte Interessen vorhanden sind
    const { deletedInterests, ...updatedProfileInfo } = userProfileInfo;

    // Falls gelöschte Interessen vorhanden sind, entferne sie aus dem Benutzerprofil
    if (deletedInterests && deletedInterests.length > 0) {
      const user = await User.findById(authenticatedUserId);
      if (!user) throw new Error("User not found");

      // Entferne die gelöschten Interessen aus dem Benutzerprofil
      updatedProfileInfo.interests = user.interests.filter(
        (interest) => !deletedInterests.includes(interest)
      );
    }

    // Führe die Aktualisierung des Benutzerprofils durch
    const updatedUser = await User.findByIdAndUpdate(
      authenticatedUserId,
      updatedProfileInfo,
      { new: true }
    );

    return userToProfileInfo(updatedUser);
  } catch (error) {
    // throw new Error("Could not update user profile");
    console.log("Failed to update profile info: ", error);
  }
}

function userToProfileInfo({
  _id,
  userName,
  userAddress: { street, zip, city, province },
  profilePicURL,
  bio,
  interests,
}) {
  return {
    _id,
    userName,
    userAddress: { street, zip, city, province },
    profilePicURL,
    bio,
    interests,
  };
}
