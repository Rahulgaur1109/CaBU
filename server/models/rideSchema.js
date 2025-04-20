const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    fromLocation: {
      type: String,
      required: true,
      trim: true,
    },
    toLocation: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
