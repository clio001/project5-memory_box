import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    location: {
      latitude: String,
      longitude: String,
    },
    public: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
