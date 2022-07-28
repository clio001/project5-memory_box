import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    // ! Author will be populated by GraphQL using "user_id"
    author: {
      type: String,
    },
    body: {
      type: String,
    },
    item_id: {
      type: String,
    },
    user_id: {
      type: String,
    },
    likes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
