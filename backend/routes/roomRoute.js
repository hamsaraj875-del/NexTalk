//external modules

const express = require("express");
const roomRoute = express.Router();

//internal modules
const {user,protector} = require("../utils/security");

const roomController = require("../controller/roomController");

roomRoute.post("/",user,roomController.createRoom);
roomRoute.get("/search",user,roomController.roomSearch);
roomRoute.post("/join",user,roomController.joinRoom);
roomRoute.post("/auth/roomAuthenticate",user,roomController.roomDetails);
roomRoute.post("/messages",user,roomController.roomMessage);
roomRoute.post("/userDetails",user,roomController.userDetails);

module.exports = roomRoute;