import express from "express";
const router = express.Router();
import {
  uploadAvatar,
  uploadBanner,
  uploadItemImage,
} from "../controllers/uploadImageController.js";
import { multerUploads } from "../utils/multer.js";

// * Upload avatar
router.post("/avatar", multerUploads.single("image"), uploadAvatar);

// * Upload banner
router.post("/banner", multerUploads.single("image"), uploadBanner);

// * Upload item image
router.post("/item-image", multerUploads.single("image"), uploadItemImage);

export default router;
