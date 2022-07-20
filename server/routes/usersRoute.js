import express from "express";
const router = express.Router();
import { getAllUsers } from "../controllers/usersController.js";

// * GET all users
router.get("/users/all", getAllUsers);

export default router;
