//external modules
const express = require("express");
const limiter = require("express-rate-limit");

//internal modules
const roomBlock = require("../models/roomBlock");

//chat logged user

exports.user = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    return res.status(201).json({
      success: false,
      unauthorised: true,
      message: "User not found please log in first!",
    });
  }
};

//room protector

exports.protector = async (req, res, next) => {
  const block = await roomBlock.findOne({ blocked: req.session.userId });
  if (block) {
    return res.status(500).json({
      success: false,
      message: "unauthorized access",
    });
  }
  next();
};
