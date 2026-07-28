const mongoose = require("mongoose");

const friends = new mongoose.Schema({
  user1:{type:mongoose.Schema.Types.ObjectId,ref:"database",required:true},
  user2:{type:mongoose.Schema.Types.ObjectId,ref:"database",required:true},
  status:{type:String,required:true,default:"none"},
});

module.exports = mongoose.model("friends",friends);