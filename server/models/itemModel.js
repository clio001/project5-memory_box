import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    year: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    location: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
    },
    file_url: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookmark",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    share: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
