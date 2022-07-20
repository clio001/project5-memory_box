import express from "express";
const router = express.Router();

// * GET all users
router.get("/users/all", getAllUsers);

export default router;
