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
const roomRoute = require("./roomRoute");
const Port = process.env.PORT || 3000;
const Db = process.env.DB;
const controller = require("../controller/controller");
const socket = require("../utils/socket");
const {user} = require("../utils/security");

//Session handling

const store = MongoStore.create({
  mongoUrl: process.env.DB,
  collectionName: "sessions",
  ttl: 60 * 60 * 24 * 5,
});


//cors handler 

app.use(
  cors({
    origin: ["http://localhost:5173","https://nextalk-6d1n.onrender.com"],
    credentials: true,
  })
);

app.set("trust proxy",1);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    store: store,
    resave: false,
    cookie: {
      httpOnly: true,
      secure:true,
      sameSite:"none",
      maxAge: 1000 * 60 * 60 * 24 * 5,
    },
  }),
);

// Router usage

app.use(express.json());
app.use("/auth", login);
app.use("/chat/room",roomRoute);

//auth controller for is user logged in or not


app.post("/auth/authenticate", (req, res, next) => {
  console.log("========== AUTHENTICATE REQUEST ==========");
  console.log("Session:", req.session);
  console.log("Session ID:", req.sessionID);
  console.log("isLoggedIn:", req.session?.isLoggedIn);
  console.log("userId:", req.session?.userId);

  controller.authenticate(req, res, next);
});
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


module.exports = user;