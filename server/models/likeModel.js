import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item_id: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
