import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    avatar_url: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    members: {
      type: String,
    },
    items: {
      type: String,
    },
    location: {
      type: String,
    },
    public: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
