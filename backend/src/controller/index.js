// CONTROLLER-LAYER import/ exports
// import Ctrl Functions
import { postSignUpUserCtrl } from "./userController.js";
import { postLoginUserCtrl } from "./userController.js";
import { postRefreshtokenCtrl } from "./userController.js";
import { postLogoutUserCtrl } from "./userController.js";
import { postNewEventCtrl } from "./eventController.js";
import { getAllEventsCtrl } from "./eventController.js";

export const UserController = {
  postSignUpUserCtrl,
  postLoginUserCtrl,
  postRefreshtokenCtrl,
  postLogoutUserCtrl,
};

export const EventController = {
  postNewEventCtrl,
  getAllEventsCtrl,
};

export const ReviewController = {};

export const FileController = {};
