import { catchAsync } from "../utils/catchAsync.js";
import { UserService } from "../services/index.js";

// NOTE to catchAsync: Param1: Contoller-Function (try{}-Block), Param2: Error-Message

// ====== SIGN UP ======
export const postSignUpUserCtrl = catchAsync(
  async (req, res) => {
    const result = await UserService.signUpUser(req.body);
    res.status(201).json({ success: true, result });
  },
  { message: "Could not register user" }
);

// ====== LOGIN ======
export const postLoginUserCtrl = catchAsync(
  async (req, res) => {
    const loginInfo = { email: req.body.email, password: req.body.password };
    const result = await UserService.loginUser(loginInfo);

    req.session.refreshToken = result.tokens.refreshToken;

    res.status(200).json({ success: true, result });
  },
  { message: "Could not login user" }
);

// ====== LOGOUT ======
export const postLogoutUserCtrl = catchAsync(
  async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "User not logged in" });
    }

    await UserService.logoutUser(refreshToken);

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  },
  { message: "Could not logout user" }
);

// ====== REFRESHTOKEN =======
export const postRefreshtokenCtrl = catchAsync(
  async (req, res) => {
    if (req.verifiedUserClaims.type !== "refresh")
      throw new Error("Type is not refresh Token");
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const result = await UserService.refreshToken(authenticatedUserId);
    res.status(200).json({ success: true, result });
  },
  { message: "Could not create Tokens" }
);

// ====== Get user Profile Info =======
export const getUserProfileInfoCtrl = catchAsync(
  async (req, res) => {
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const result = await UserService.getUserProfileInfo(authenticatedUserId);
    res.status(200).json({ success: true, result });
  },
  { message: "Could not retrieve user info" }
);

// ====== Edit user Profile Info =======
export const patchEditUserProfileCtrl = catchAsync(
  async (req, res) => {
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const userProfileInfo = req.body;

    const result = await UserService.editUserProfile(
      authenticatedUserId,
      userProfileInfo
    );
    res.status(200).json({ success: true, result });
  },
  { message: "Could not update user profile" }
);

// ====== Add event to wishlist =======
export const patchEventToWishlistCtrl = catchAsync(
  async (req, res) => {
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const eventId = req.params.eventId;

    const result = await UserService.addEventToWishlist(
      authenticatedUserId,
      eventId
    );
    res.status(200).json({ success: true, result });
  },
  { message: "Could not add event to wishlist" }
);

// ====== Add event to registered events list =======
export const patchEventToRegisteredEventsListCtrl = catchAsync(
  async (req, res) => {
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const eventId = req.params.eventId;

    const result = await UserService.addEventToRegisteredEventsList(
      authenticatedUserId,
      eventId
    );
    res.status(200).json({ success: true, result });
  },
  { message: "Could not add event to registered events list" }
);
