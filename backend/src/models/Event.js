import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        hostId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        eventPicUrl: { type: String },
        title: { type: String, required: true },
        eventDate: { type: Date, required: true },
        eventAddress: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String },
            street: { type: String },
            provice: { type: String, required: true },
            locationInfo: { type: String },
        },
        category: {
            type: String,
            enum: ["music", "art", "sport", "food", "movie", "others"],
        },
        description: { type: String, required: true },
        maxGuests: { type: Number, required: true },
        registeredGuests: [{ type: mongoose.Types.ObjectId }],
        wishlistCounter: [{ type: mongoose.Types.ObjectId }],
        isCancelled: { type: Boolean, default: false },
        fullyBooked: { type: Boolean, default: false },
    },
    { collection: "events", timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
