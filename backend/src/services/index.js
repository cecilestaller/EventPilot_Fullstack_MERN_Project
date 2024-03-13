// * SERVICE-LAYER import/ export
import { signUpUser } from "./signUpUser.js";
import { loginUser } from "./loginUser.js";
import { logoutUser } from "./logoutUser.js";
import { refreshToken } from "./refreshToken.js";
import { addNewEvent } from "./addNewEvent.js";
import { getAllEvents } from "./getAllEvents.js";
import { getEventDetails } from "./getEventDetails.js";
import { getUserProfileInfo } from "./getUserProfileInfo.js";
import { addEventToWishlist } from "./addEventToWishlist.js";
import { editUserProfile } from "./editUserProfile.js";
import { addEventToRegisteredEventsList } from "./addEventToRegisteredEventsList.js";
import { fillRegisteredGuestsArray } from "./fillRegisteredGuestsArray.js";
import { toggleIsCancelled } from "./toggleIsCancelled.js";
import { fillEventWishlistCounter } from "./fillEventWishlistCounter.js";
import { editEvent } from "./editEvent.js";

export const UserService = {
  signUpUser,
  loginUser,
  refreshToken,
  logoutUser,
  getUserProfileInfo,
  addEventToWishlist,
  editUserProfile,
  addEventToRegisteredEventsList,
};

export const EventService = {
    addNewEvent,
    getAllEvents,
    getEventDetails,
    fillRegisteredGuestsArray,
    fillEventWishlistCounter,
    editEvent,
    toggleIsCancelled,
};

export const ReviewService = {};
