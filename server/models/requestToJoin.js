const mongoose = require("mongoose");

const requestToJoinSchema = new mongoose.Schema(
  {
    fromPickupLocation: {
      type: String,
      required: true,
    },
    toLocation: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerPerson: {
      type: Number,
      required: true,
      min: 0,
    },
    additionalNotes: {
      type: String,
      default: "",
    },
    ownerEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    requestEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const RequestToJoin = mongoose.model("requestToJoin", requestToJoinSchema);

module.exports = RequestToJoin;
