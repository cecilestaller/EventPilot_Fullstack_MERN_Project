import { catchAsync } from "../utils/catchAsync.js";

export const postFileUploadCtrl = catchAsync(
    async (req, res) => {
        const uploadedFilname = req.file.filename;
        res.json({ success: true, result: { filename: uploadedFilname } });
    },
    { message: "Could not upload provided file" }
);
