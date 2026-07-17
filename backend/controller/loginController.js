//external modules 
const bcrypt = require("bcrypt");


//internal modules
const database = require("../models/database");



//router handling functions

//user signup

exports.signUp = async(req,res,next)=>{
  const data = req.body;
  const email = data.email;
  const name = data.name;
  const pass = data.password;

  try{
    const user = await database.findOne({email:email});
    if(user){
      return res.status(409).json({
        success:false,
        message:"user already exists"
      })
    }else{
      const password = await bcrypt.hash(pass,12);
      const details = new database({name:name,email:email,password:password});
      await details.save();
      return res.status(201).json({
        success:true,
        message:"Successfully created the account"
      })
    }
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}


//user login for account

exports.login = (req,res,next)=>{
  const data = req.body;
  const email = data.email;
  const password = data.password;

  try{
    const user = await database.findOne({email:email});
    if(user && await bcrypt.compare(user.password,password)){
      
    }
  }
}