import mongoose from "mongoose";
const { Schema } = mongoose;

const bookmarkSchema = new Schema(
  {
    item_id: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
