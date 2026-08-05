const mongoose = require("mongoose");

const messages = mongoose.Schema({
  senderId:{type:String,required:true},
  recieverId:{type:String,required:true},
  message:{type:String,required:true},          
  time:{type:Date,required:true},
  status:{type:String,required:true},
});


module.exports = mongoose.model("messages",messages);