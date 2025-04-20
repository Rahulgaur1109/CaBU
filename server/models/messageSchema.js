const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      ref: "RideGroup",
    },
    senderEmail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
