// * SERVICE-LAYER import/ export
import { signUpUser } from "./signUpUser.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";

export const UserService = {
  signUpUser,
  loginUser,
  refreshToken,
};

export const EventService = {};

export const ReviewService = {};
