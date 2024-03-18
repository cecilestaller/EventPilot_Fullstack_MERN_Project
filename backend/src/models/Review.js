import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        stars: { type: Number, required: true, min: 0, max: 5 },
        text: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true }, // ID of User who writes the Review
        reviewerName: { type: String, required: true }, //userName of User who writes review
        hostId: { type: mongoose.Types.ObjectId, required: true }, // ID of Event-Organizor
    },
    { collection: "reviews", timestamps: true }
);

const Review = mongoose.model("reviews", reviewSchema);
export default Review;
