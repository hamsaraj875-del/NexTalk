//external modules
const bcrypt = require("bcrypt");
const {check,validationResult} = require("express-validator");


//internal modules
const room = require("../models/room");

//room creation

exports.createRoom=[
  check("name")
  .isEmpty()
  .withMessage("name cannot be empty"),
  check("password")
  .isEmpty()
  .withMessage("password cannot be empty"),
  check("type")
  .withMessage("type cannot be empty"),

  async(req,res,next)=>{
    const errors = validationResult(req);
    const formattedError = {name:null,password:null,type:null},

    if(!errors.isEmpty()){
      errors.array().forEach(err=>{
        if(!formattedError[err.path]){
          formattedError[err.path] = err.msg;
        }
      });
      return res.status(500).json({
        success:false,
        message:formattedError,
      });
    }
    const {name,password:pass,description,type} = req.body;
    try{

    const password = await bcrypt.hash(pass,12);
    const owner = req.session.userId;
    const details = new room({name,password,description,type,owner});
    await details.save();
    return res.status(200).json({
      success:true,
      message:'Room named '+name+'created successfully',  
    })
    }catch(err){
      return res.status(500).json({
        success:false,
        message:"Error occured while creating room please try again"
      })
    }
  }
]
  
