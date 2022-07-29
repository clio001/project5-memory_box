import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// * GET all users
const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json({
      total: users.length,
      msg: "Success: All users retrieved.",
      msgAlert: "success",
      users,
    });
  } catch (error) {
    response.status(404).json({
      msg: "Error: No users found",
    });
  }
};

// * Create new user
const createNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      console.log("User email already exists.");
      res.status(400).json({
        msg: "User email already exists",
        exists,
      });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
          email: req.body.email,
          password: hash,
        });
        res.json({
          msg: `User ${req.body.email} created.`,
          msgAlert: "success",
          newUser,
        });
      } catch (error) {
        res.status(400).json({
          msg: "Unable to create new user.",
          msgAlert: "warning",
          error,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// * Delete user by email
const deleteUserByEmail = async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await User.deleteOne({ email: req.body.email });
    res.status(200).json({
      msg: `User ${req.body.email} deleted.`,
      msgAlert: "success",
      user,
    });
  } catch (error) {
    res.status(404).json({
      msg: `User ${req.body.email} not found.`,
      error,
    });
  }
};

export { getAllUsers, createNewUser, deleteUserByEmail };
