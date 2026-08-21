//external modules

const express = require("express");
const room = express.Router();

//internal modules

const roomController = require("../controller/roomController");

room.post("/room",roomController.createRoom);