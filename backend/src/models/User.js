import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userAddress: {
      city: { type: String },
      zip: { type: String, minLength: 5, maxLength: 5 },
      province: { type: String },
      country: { type: String },
    },
    bio: { type: String },
    interests: [{ type: String }],
    profilePicURL: { type: String },
    follower: [{ type: mongoose.Types.ObjectId }], // IDs von Usern, die diesem User folgen
    following: [{ type: mongoose.Types.ObjectId }], // IDs von Usern, dem diser User folgt
    userWishlist: [{ type: mongoose.Types.ObjectId }], // Event-IDs
    registeredEvents: [{ type: mongoose.Types.ObjectId }], // IDs von Events, für die sich der User registriert hat
  },
  { collection: "users", timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("email")) {
    user.email = user.email.toLowerCase();
  }

  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
      next();
    });
  }
});

const User = mongoose.model("User", userSchema);
export default User;
