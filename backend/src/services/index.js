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
import { toggleIsCancelled } from "./toggleIsCancelled.js";
import { editEvent } from "./editEvent.js";
import { addReview } from "./addReview.js";
import { getHostProfileDetails } from "./getHostProfileDetails.js";
import { removeEventFromWishlist } from "./removeEventFromWishlist.js";
import { getUserWishlist } from "./getUserWishlist.js";
import { getUserRegisteredEvents } from "./getUserRegisteredEvents.js";

export const UserService = {
    signUpUser,
    loginUser,
    refreshToken,
    logoutUser,
    getUserProfileInfo,
    addEventToWishlist,
    editUserProfile,
    addEventToRegisteredEventsList,
    getHostProfileDetails,
    removeEventFromWishlist,
    getUserWishlist,
    getUserRegisteredEvents,
};

export const EventService = {
    addNewEvent,
    getAllEvents,
    getEventDetails,
    editEvent,
    toggleIsCancelled,
};

export const ReviewService = {
    addReview,
};
