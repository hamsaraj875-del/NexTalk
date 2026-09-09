const mongoose = require("mongoose");

const messages = mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  status: { type: String, required: true },
});

module.exports = mongoose.model("messages", messages);
