// CONTROLLER-LAYER import/ exports
// import Ctrl Functions
import { postSignUpUserCtrl } from "./userController.js";
import { postLoginUserCtrl } from "./userController.js";
import { postRefreshtokenCtrl } from "./userController.js";
import { postLogoutUserCtrl } from "./userController.js";
import { postNewEventCtrl } from "./eventController.js";
import { getAllEventsCtrl } from "./eventController.js";
import { getEventDetailsCtrl } from "./eventController.js";
import { getUserProfileInfoCtrl } from "./userController.js";
import { patchEventToWishlistCtrl } from "./userController.js";
import { patchFillRegisteredGuestCheckFullyBookedCtrl } from "./eventController.js";
import { postFileUploadCtrl } from "./fileUploadController.js";
import { patchEditUserProfileCtrl } from "./userController.js";
import { patchEventToRegisteredEventsListCtrl } from "./userController.js";
import { patchEventIsCancelledCtrl } from "./eventController.js";
import { patchFillWishlistCounterCtrl } from "./eventController.js";
import { patchEditEventCtrl } from "./eventController.js";

export const UserController = {
    postSignUpUserCtrl,
    postLoginUserCtrl,
    postRefreshtokenCtrl,
    postLogoutUserCtrl,
    getUserProfileInfoCtrl,
    patchEventToWishlistCtrl,
    patchEditUserProfileCtrl,
    patchEventToRegisteredEventsListCtrl,
};

export const EventController = {
    postNewEventCtrl,
    getAllEventsCtrl,
    getEventDetailsCtrl,
    patchFillRegisteredGuestCheckFullyBookedCtrl,
    patchFillWishlistCounterCtrl,
    patchEditEventCtrl,
    patchEventIsCancelledCtrl,
};

export const ReviewController = {};

export const FileController = {
    postFileUploadCtrl,
};
