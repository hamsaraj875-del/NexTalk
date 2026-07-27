const mongoose = require("mongoose");

const friends = createSchema({
  user1:{type:mongoose.Schema.Types.ObjectId,ref:"database",required:true},
  user2:{type:mongoose.Schema.Types.ObjectId,ref:"database",required:true},
  status:{type:String,required:true,default:"pending"},
});

module.export = mongoose.model("friends",friends);