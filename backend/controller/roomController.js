//external modules
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

//internal modules
const room = require("../models/room");
const roomMessage = require("../models/roomMessages");
const database = require("../models/database");
const roomBlock = require("../models/roomBlock");

//room creation

exports.createRoom = [
  check("name").notEmpty().withMessage("name cannot be empty"),
  check("password")
    .if((value, { req }) => req.body.type === "private")
    .notEmpty()
    .withMessage("Password cannot be empty"),
  check("type").notEmpty().withMessage("type cannot be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);
    const formattedError = { name: null, password: null, type: null };

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        if (!formattedError[err.path]) {
          formattedError[err.path] = err.msg;
        }
      });
      return res.status(500).json({
        success: false,
        message: formattedError,
      });
    }
    const { name, password: pass, description, type } = req.body;
    try {
      let passoword = "";
      if (type == "private") {
        password = await bcrypt.hash(pass, 12);
      } else {
        password = "none";
      }
      const owner = req.session.userId;
      const ownerName = req.session.userName;
      const details = new room({
        name,
        password,
        description,
        type,
        owner,
        ownerName,
        users: [owner],
      });
      await details.save();
      req.session.roomId = details._id;
      await req.session.save();
      return res.status(200).json({
        success: true,
        message: "Room named " + name + "created successfully",
        roomId: details._id,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error occured while creating room please try again",
      });
    }
  },
];

//room primary details
exports.roomDetails = async (req, res, next) => {
  const { roomId } = req.body || {};
  try {
    const roomDetails = await room
      .findById(roomId)
      .select("name description type owner ownerName");
    if (roomDetails) {
      return res.status(200).json({
        success: true,
        message: roomDetails,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "unauthorised access",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error please try again !",
    });
  }
};

//room searching
exports.roomSearch = async (req, res, next) => {
  const { name } = req.query || {};
  try {
    const l = await room
      .find({ name: { $regex: name, $options: "i" } })
      .select("name description type owner");

    return res.status(200).json({
      success: true,
      message: l,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: [],
    });
  }
};

//joining room 

exports.joinRoom = async (req, res, next) => {
  const group = req.body;
  const data = await room.findById(group._id);
  if (data.type == "private") {
    if (group.password && data) {
      const comp = await bcrypt.compare(group.password, data.password);
      if (comp) {
        if (!data.users.includes(req.session.userId)) {
          data.users.push(req.session.userId);
          await data.save();
        }
        return res.status(200).json({
          success: true,
          roomId: data._id,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "invalid password",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "invalid password",
      });
    }
  } else {
    if (data) {
      data.users.push(req.session.userId);
      await data.save();
      return res.status(200).json({
        success: true,
        roomId: data._id,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "invalid room",
      });
    }
  }
};

//room existing messages
exports.roomMessage = async (req, res, next) => {
  const { roomId } = req.query;
  try {
    const roomData = await room.findById(roomId);
    if (roomData && roomData.users.includes(req.session.userId)) {
      const roomMessages = await roomMessage.find({ roomId: roomData._id });
      return res.status(200).json({
        success: true,
        message: roomMessages,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "unauthorised access",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//user details
exports.userDetails = (req, res, next) => {
  try {
    const userId = req.session.userId;
    const userName = req.session.userName;
    return res.status(200).json({
      success: true,
      message: { userId, userName },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "not found",
    });
  }
};

//user blocker

exports.blockUser = async (req, res, next) => {
  const { userId, roomId } = req.body();
  console.log("block hit!");
  try {
    const room = await room.findOne({ _id: roomId, owner: req.session.userId });
    const user = await database.findById({ userId });
    if (!user) {
      return res.staus(500).json({
        success: false,
        message: "user not found",
      });
    }
    if (room && room.users.include(userId)) {
      const blocker = req.session.userId;
      const blocked = user._id;
      const details = new roomBlock({ blocker, blocked });
      await roomBlock.save();
      return res.status(200).json({
        success: true,
        message: "Blocked the user" + user.name,
      });
    }else{
      return res.status(500).json({
        success:false,
        message:"User not found",
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred please try again !",
    });
  }
};
