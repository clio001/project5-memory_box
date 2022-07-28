import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    comment_id: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
