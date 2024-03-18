import { User, Review } from "../models/index.js";

export async function addReview(authenticatedUserId, hostId, reviewInfo) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    const foundHost = await User.findById(hostId);
    if (!foundHost) throw new Error("User doesn't exist anymore");

    const newReview = await Review.create({
        ...reviewInfo,
        userId: foundUser._id,
        hostId: foundHost._id,
        reviewerName: foundUser.userName,
    });

    return newReview;
}
