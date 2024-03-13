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
import { fillRegisteredGuestsArray } from "./fillRegisteredGuestsArray.js";

export const UserService = {
    signUpUser,
    loginUser,
    refreshToken,
    logoutUser,
    getUserProfileInfo,
    addEventToWishlist,
};

export const EventService = {
    addNewEvent,
    getAllEvents,
    getEventDetails,
    fillRegisteredGuestsArray,
};

export const ReviewService = {};
