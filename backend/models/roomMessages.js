const mongoose = require("mongoose");

const schema = mongoose.Schema({
  roomId:{type:String,required:true},
  senderId:{ref:"database",type:String,required:true},
  senderName:{type:String,required:true},
  message:{type:String,required:true},
  time:{type:Date,default:Date.now},
});

module.exports = mongoose.model("roomMessages",schema);