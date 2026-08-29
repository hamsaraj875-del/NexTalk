//external modules
const express = require("express");
const limiter = require("express-rate-limit");

//chat logged user

exports.user = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    return res.status(201).json({
      success: false,
      unauthorised:true,
      message: "User not found please log in first!",
    });
  }
};



//room protector

exports.protector = (req,res,next)=>{
  if(req.session.roomId == req.params.roomId){
    next();
  }
  return res.status(500).json({
    success:false,
    message:"unauthorized access",
  })
}