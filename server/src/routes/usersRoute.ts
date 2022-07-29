import express from "express";
const router = express.Router();
import {
  getAllUsers,
  createNewUser,
  deleteUserByEmail,
} from "../controllers/usersController.js";

// * GET all users
router.get("/all", getAllUsers);

// * Create new user
router.post("/new", createNewUser);

// * Delete user by email
router.delete("/delete", deleteUserByEmail);

export default router;
