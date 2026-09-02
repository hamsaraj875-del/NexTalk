const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name:{type:String,required:true},
  description:{type:String},
  password:{type:String,required:true},
  type:{type:String,required:true},
  owner:{type:mongoose.Schema.Types.ObjectId,required:true},
  ownerName:{type:String,required:true},
  users:{type:Array,required:true,default:[]},
});

module.exports = mongoose.model("rooms",schema);