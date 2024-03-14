import { catchAsync } from "../utils/catchAsync.js";
import { ReviewService } from "../services/index.js";

// export Ctrl-Functions
export const postNewReviewCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const hostId = req.params.hostId;
        const reviewInfo = req.body;
        const result = await ReviewService.addReview(
            authenticatedUserId,
            hostId,
            reviewInfo
        );
        res.status(201).json({ success: true, result });
    },
    { message: "Could not Review" }
);
