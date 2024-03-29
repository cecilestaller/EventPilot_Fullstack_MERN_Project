import express from "express";
import { UserController } from "../controller/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
// import doJwtAuth

export const userRouter = express
    .Router()
    .post("/signup", UserController.postSignUpUserCtrl)
    .post("/login", UserController.postLoginUserCtrl)
    .post("/logout", UserController.postLogoutUserCtrl)
    .post("/refreshtoken", doJwtAuth, UserController.postRefreshtokenCtrl)
    .get("/", doJwtAuth, UserController.getUserProfileInfoCtrl)
    .get("/wishlist-events", doJwtAuth, UserController.getUserWishlistCtrl)
    .get(
        "/registered-events",
        doJwtAuth,
        UserController.getUserRegisteredEventsCtrl
    )
    .get("/host-details/:hostId", doJwtAuth, UserController.getHostDetailsCtrl)
    .patch(
        "/wishlist/:eventId",
        doJwtAuth,
        UserController.patchEventToWishlistCtrl
    )
    .patch("/edit-profile", doJwtAuth, UserController.patchEditUserProfileCtrl)
    .patch(
        "/register/:eventId",
        doJwtAuth,
        UserController.patchEventToRegisteredEventsListCtrl
    )
    .patch(
        "/update-wishlist/:eventId",
        doJwtAuth,
        UserController.patchRemoveEventFromWishlistCtrl
    );
