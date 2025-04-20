const mongoose = require("mongoose");

const rideGroupSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      unique: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    membersEmail: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const RideGroup = mongoose.model("RideGroup", rideGroupSchema);

module.exports = RideGroup;
