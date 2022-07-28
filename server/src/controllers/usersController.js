import User from "../models/userModel.js";

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

export { getAllUsers };
