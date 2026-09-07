const mongoose = require("mongoose");

const schema = mongoose.Schema({
  blocker:{type:String,required:true},
  blocked:{type:String,required:true},
});

module.exports = mongoose.model("roomBlockers",schema);