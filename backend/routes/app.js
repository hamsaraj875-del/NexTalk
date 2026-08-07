//External modules

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
dotenv.config();

//Internal modules

const login = require("./login");
const Port = process.env.PORT || 3000;
const Db = process.env.DB;
const controller = require("../controller/controller");
const socket = require("../utils/socket");

//Session handling

const store = MongoStore.create({
  mongoUrl: process.env.DB,
  collectionName: "sessions",
  ttl: 60 * 60 * 24 * 5,
});


//cors handler 

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    store: store,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 5,
    },
  }),
);

// Router usage

app.use(express.json());
app.use("/auth", login);

//auth controller for is user logged in or not

const user = (req, res, next) => {
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


app.post("/auth/authenticate",controller.authenticate);
app.post("/search",user,controller.searchUsers);
app.post("/friends",user,controller.friends);
app.post("/invite",user,controller.invite);
app.post("/accept",user,controller.accept);
app.post("/notifications",user,controller.notification);
app.post("/userDetails",user,controller.hostDetails);
app.post("/messages",user,controller.messages);

socket(server);

mongoose.connect(Db).then(() => {
  console.log("Server and database are connected successfully");
  server.listen(Port, () => {
    console.log(`Server is running in the http://localhost:${3000}`);
  });
});
