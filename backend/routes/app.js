//External modules 

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
const {MongoStore} = require("connect-mongo")
const cors = require("cors");
dotenv.config();


//Internal modules

const login = require("./login");
const Port = process.env.PORT || 3000;
const Db = process.env.DB;


//Session handling

const store = MongoStore.create({
  mongoUrl: process.env.DB,
  collectionName: "sessions",
  ttl: 60 * 60 * 24 * 5,
});

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
})
)

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

// Router usage

app.use(express.json());
app.use("/auth",login);


mongoose.connect(Db).then(()=>{
  console.log("Server and database are connected successfully");
  app.listen(Port,()=>{
    console.log(`Server is running in the http://localhost:${3000}`);
  });
});