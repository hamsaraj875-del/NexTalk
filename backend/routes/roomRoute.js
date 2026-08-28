//external modules

const express = require("express");
const roomRoute = express.Router();

//internal modules


//room protector 
const protector = (req,res,next)=>{
  if(req.session.roomId == req.params.roomId){
    next();
  }
  return res.status(500).json({
    success:false,
    message:"unauthorized access",
  })
}

const roomController = require("../controller/roomController");

roomRoute.post("/",roomController.createRoom);
roomRoute.get("/:roomId",protector,roomController.joinRoom);

module.exports = roomRoute;