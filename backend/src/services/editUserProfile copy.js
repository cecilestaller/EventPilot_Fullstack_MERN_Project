import { User } from "../models/index.js";

export async function editUserProfile(authenticatedUserId, userProfileInfo) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist");

    const filter = { _id: foundUser._id };
    const update = {
        userName: userProfileInfo.userName,
        profilePicURL: userProfileInfo.profilePicURL,
        userAddress: {
            city: userProfileInfo.userAddress?.city,
            zip: userProfileInfo.userAddress?.zip,
            province: userProfileInfo.userAddress?.province,
            country: userProfileInfo.userAddress?.country,
        },
        bio: userProfileInfo.bio,
        interests: userProfileInfo.interests,
    };

    const updatedUserProfile = await User.findOneAndUpdate(filter, update, {
        new: true,
    });

    return userToProfileInfo(updatedUserProfile);
}

function userToProfileInfo({
    _id,
    userName,
    userAddress,
    profilePicURL,
    bio,
    interests,
}) {
    return {
        _id,
        userName,
        userAddress,
        profilePicURL,
        bio,
        interests,
    };
}
