import { User } from "../models/index.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export async function loginUser({ email, password }) {
    // validate login credentials
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new Error("User with this email doesn't exist");

    // check password
    const userPassword = password;
    const passwordMatch = await bcrypt.compare(
        userPassword,
        foundUser.password
    );
    if (!passwordMatch) throw new Error("Wrong password");

    // generate tokens
    const accessToken = createToken(foundUser, "access");
    const refreshToken = createToken(foundUser, "refresh");

    return {
        user: userToProfileInfo(foundUser),
        tokens: { accessToken, refreshToken },
    };
}

function userToProfileInfo({
    _id,
    userName,
    email,
    userAddress,
    profilePicURL,
    userWishlist,
    registeredEvents,
    bio,
    interests,
    follower,
    following,
}) {
    return {
        _id,
        userName,
        email,
        userAddress,
        profilePicURL,
        userWishlist,
        registeredEvents,
        bio,
        interests,
        follower,
        following,
    };
}
