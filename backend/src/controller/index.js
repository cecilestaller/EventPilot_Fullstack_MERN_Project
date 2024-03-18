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
import { postFileUploadCtrl } from "./fileUploadController.js";
import { patchEditUserProfileCtrl } from "./userController.js";
import { patchEventToRegisteredEventsListCtrl } from "./userController.js";
import { patchEventIsCancelledCtrl } from "./eventController.js";
import { patchEditEventCtrl } from "./eventController.js";
import { postNewReviewCtrl } from "./reviewController.js";
import { getHostDetailsCtrl } from "./userController.js";
import { patchRemoveEventFromWishlistCtrl } from "./userController.js";
import { getUserWishlistCtrl } from "./userController.js";
import { getUserRegisteredEventsCtrl } from "./userController.js";

export const UserController = {
    postSignUpUserCtrl,
    postLoginUserCtrl,
    postRefreshtokenCtrl,
    postLogoutUserCtrl,
    getUserProfileInfoCtrl,
    patchEventToWishlistCtrl,
    patchEditUserProfileCtrl,
    patchEventToRegisteredEventsListCtrl,
    getHostDetailsCtrl,
    patchRemoveEventFromWishlistCtrl,
    getUserWishlistCtrl,
    getUserRegisteredEventsCtrl,
};

export const EventController = {
    postNewEventCtrl,
    getAllEventsCtrl,
    getEventDetailsCtrl,
    patchEditEventCtrl,
    patchEventIsCancelledCtrl,
};

export const ReviewController = {
    postNewReviewCtrl,
};

export const FileController = {
    postFileUploadCtrl,
};
