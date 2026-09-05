const mongoose = require("mongoose");

const schema = mongoose.Schema({
  blocker:{type:String,required},
  blocked:{type:String,required},
});

module.exports = mongoose.model(schema,"roomBlockers");