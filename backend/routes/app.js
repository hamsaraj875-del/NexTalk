//External modules 

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();


//Internal modules

const Port = process.env.PORT || 3000;
const Db = process.env.DB;


//Session handling

const store = new monogoDBStore({
  uri:process.env.DB,
  collection:'session',
  expires:60*60*24*5,
});

app.use(session({
  secret:process.env.SECRET_KEY,
  saveUninitialized:false,
  store:store,
  resave:false,
  cookie:{
    httpOnly:true,
    maxAge:1000*60*60*24*5
  }
}));



mongoose.connect(Db).then(()=>{
  console.log("Server and database are connected successfully");
  app.listen(Port,()=>{
    console.log(`Server is running in the http://localhost:${3000}`);
  });
});