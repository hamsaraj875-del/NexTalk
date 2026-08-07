const mongoose = require("mongoose");

const messages = mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("messages", messages);
