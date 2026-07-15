//External modules 

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


//Internal modules

const Port = process.env.PORT || 3000;
const Db = process.env.DB;


mongoose.connect(Db).then(()=>{
  console.log("Server and database are connected successfully");
  app.listen(Port,()=>{
    console.log(`Server is running in the http://localhost:${3000}`);
  });
});