import mongoose from "mongoose";

const { Schema } = mongoose;

const bookmarkSchema = new Schema<dbModel.Bookmark>(
  {
    item_id: {
      type: String,
    },
    user_id: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
