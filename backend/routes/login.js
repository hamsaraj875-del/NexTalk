//external module

const express = require("express");
const login = express.Router();


//internal modules

const loginController = require("../controller/loginController");


login.post("/login",loginController.login);
login.post("/signUp",loginController.signUp);
login.post("/otp",loginController.otp);

module.exports = login;