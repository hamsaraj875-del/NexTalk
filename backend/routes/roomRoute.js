//external modules

const express = require("express");
const roomRoute = express.Router();

//internal modules
const {user,protector} = require("../utils/security");

const roomController = require("../controller/roomController");

roomRoute.post("/",user,roomController.createRoom);
roomRoute.get("/search",user,roomController.roomSearch);
roomRoute.get("/:roomId",user,protector,roomController.joinRoom);
roomRoute.post("/auth/roomAuthenticate",user,protector,roomController.roomDetails);

module.exports = roomRoute;