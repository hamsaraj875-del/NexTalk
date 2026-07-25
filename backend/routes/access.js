//external modules

const express = require("express");
const access = express.Router();

//internal modules

const accessControl = require("../controller/accessControl");

//router handler

access.post("/",accessControl.isLogged);


module.exports = access;
