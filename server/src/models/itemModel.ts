import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema<dbModel.Item>(
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
    user_id: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    type: {
      type: String,
    },
    file_url: {
      type: String,
    },
    groups: {
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
