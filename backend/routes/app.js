//External modules 

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


//Internal modules


mongoose.connect(process.env.DB).then(()=>{
  console.log("Server and database are connected successfully");
  app.listen(process.env.PORT,()=>{
    console.log(`Server is running in the http://localhost:${3000}`);
  });
});