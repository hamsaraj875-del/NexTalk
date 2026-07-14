const mongoose = require("mongoose");

const database = mongoose.createSchema({
  text : {type:String,required:true},
  time : {type:String,required:true}
});

module.exports = mongoose.model("database");