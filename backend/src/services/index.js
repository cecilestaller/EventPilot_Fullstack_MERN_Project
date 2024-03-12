// * SERVICE-LAYER import/ export
import { signUpUser } from "./signUpUser.js";
import { loginUser } from "./loginUser.js";
import { logoutUser } from "./logoutUser.js";
import { refreshToken } from "./refreshToken.js";

import { addNewEvent } from "./addNewEvent.js";

export const UserService = {
  signUpUser,
  loginUser,
  refreshToken,
  logoutUser,
};

export const EventService = {
  addNewEvent,
};

export const ReviewService = {};
