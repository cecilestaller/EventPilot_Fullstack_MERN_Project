import { catchAsync } from "../utils/catchAsync.js";
import { UserService } from "../services/index.js";

// NOTE to catchAsync: Param1: Contoller-Function (try{}-Block), Param2: Error-Message

export const postSignUpUserCtrl = catchAsync(
    async (req, res) => {
        const result = await UserService.signUpUser(req.body);
        res.status(201).json({ success: true, result });
    },
    { message: "Could not register user" }
);
