import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema<dbModel.User>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    role: {
      type: String,
    },
    comments: {
      type: String,
    },

    bookmarks: {
      type: String,
    },
    likes: {
      type: String,
    },
    items: {
      type: String,
    },
    groups: {
      type: String,
    },
    following: [
      {
        type: String,
      },
    ],
    location: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
