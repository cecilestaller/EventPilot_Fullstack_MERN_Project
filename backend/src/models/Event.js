import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        hostId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        eventPicURL: { type: String },
        title: { type: String, required: true },
        eventDate: { type: Date, required: true },
        eventAddress: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String },
            street: { type: String },
            province: { type: String, required: true },
            locationInfo: { type: String },
        },
        category: {
            type: String,
            enum: [
                "music",
                "art",
                "sport",
                "food",
                "movie",
                "comedy",
                "literature",
                "others",
            ],
        },
        description: { type: String, required: true },
        maxGuests: { type: Number, required: true },
        registeredGuests: [
            {
                userId: { type: mongoose.Types.ObjectId },
                profilePicURL: { type: String },
                _id: false,
            },
        ],
        wishlistCounter: [{ type: mongoose.Types.ObjectId }],
        isCancelled: { type: Boolean, default: false },
        fullyBooked: { type: Boolean, default: false },
    },
    { collection: "events", timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
