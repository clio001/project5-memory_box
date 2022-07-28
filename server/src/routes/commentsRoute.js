import express from "express";
const router = express.Router();

import { getCommentsByItemId } from "../controllers/commentsController.js";

// * GET comments by item_id
router.get("/item-id", getCommentsByItemId);

export default router;
