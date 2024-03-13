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

export const UserController = {
  postSignUpUserCtrl,
  postLoginUserCtrl,
  postRefreshtokenCtrl,
  postLogoutUserCtrl,
  getUserProfileInfoCtrl,
};

export const EventController = {
  postNewEventCtrl,
  getAllEventsCtrl,
  getEventDetailsCtrl,
};

export const ReviewController = {};

export const FileController = {};
