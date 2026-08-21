const mongoose = require("mongoose");

const schema = new mongoose.schema({
  name:{type:String,required:true},
  description:{type:String,default:""},
  password:{type:String,required:true},
  type:{type:String,required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,required:true},
});

module.exports = mongoose.model(schema,rooms);