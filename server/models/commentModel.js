import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
