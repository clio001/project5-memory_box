import express from "express";
const router = express.Router();

// * GET all items
router.get("/items/all", getAllItems);

export default router;
