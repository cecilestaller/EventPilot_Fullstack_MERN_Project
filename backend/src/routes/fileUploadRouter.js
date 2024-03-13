import express from "express";
import multer from "multer";
import { FileController } from "../controller/index.js";

// 1) Define fileUpload PATH
const fileUploadPath = new URL("../../data/images", import.meta.url).pathname;

// 2) Define attachmentStorage (multer.diskstorage) to configure file-destination and filename
const attachmentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fileUploadPath);
    },
    filename: function (_, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// 3) Define uploadMiddleware with multer({ storage: attachmentStorage }) for fileUploadRouter
const uploadMiddleware = multer({ storage: attachmentStorage }).single("image");

// 4) Define Router
export const fileUploadRouter = express
    .Router()
    .post("/upload", uploadMiddleware, FileController.postFileUploadCtrl);
