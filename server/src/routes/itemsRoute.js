import express from "express";
const router = express.Router();
import { getAllItems } from "../controllers/itemsController.js";

// * GET all items
router.get("/all", getAllItems);

export default router;
