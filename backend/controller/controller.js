//external modules

//internal modules
const database = require("../models/database");
const friends = require("../models/friends");

//authenticating the user

exports.authenticate = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.status(200).json({
      success: true,
      message: "The user is logged in",
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "The user is not logged in ",
    });
  }
};

//Friends search

exports.friends = async (req, res, next) => {
  try {
    const friendsList = await friends.find({
      $or: [
        { user1: req.session.userId, status: "Accepted" },
        { user2: req.session.userId, staus: "Accepted " },
      ],
    });
    return res.status(200).json({
      success: true,
      message: friendsList,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while searching friends",
    });
  }
};

//User global search

exports.searchUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    const list = await database
      .find({ name: { $regex: name, $options: "i" } })
      .select("name _id");

    list.filter((user) => user._id.toString() != req.session.userId);
    const result = await Promise.all(
      list.map(async (user) => {
        if (user._id.toString() !== req.session.userId) {
          const friend = await friends.findOne({
            $or: [
              { user1: req.session.userId, user2: user._id },
              { user1: user._id, user2: req.session.userId },
            ],
          });
          return {
            userId: user._id,
            userName: user.name,
            userStatus: friend?.status || "none",
          };
        }
      }),
    );
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(201).json({
      success: false,
      message: "Search not found!",
    });
  }
};

//Inviting user

exports.invite = async (req, res, next) => {
  const { userId: user2, userName: name } = req.body;
  try {
    const user1 = req.session.userId;
    const data = await friends.findOne({ user1: user1, user2: user2 });
    if (data) {
      console.log(data);
      return res.json({
        success: false,
        message:
          "Invitation is already sent please wait util the user accept !",
      });
    }
    const status = "pending";
    const details = new friends({ user1, user2, status });
    await details.save();

    return res.status(200).json({
      success: true,
      message: "Invitation sent to " + name,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error occured please try again !",
    });
  }
};

//Invitation acceptation
exports.accept = async (req, res, next) => {
  const user = req.query;
  try {
    const result = await friends.findAndUpdate(
      { user1: user, user2: req.session.userId, status: "Pending" },
      { $set: { status: "accepted" } },
    );
    if (result) {
      return res.status(200).json({
        success: true,
        message: "accepted the result",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "user not found please try again later",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error occured please try again later!",
    });
  }
};

//Notification display

exports.notification = async (req, res, next) => {
  try {
    const notify = await friends.find({
      user2: req.session.userId,
      status: "pending",
    });
    console.log(notify);
    const result = await Promise.all(
      notify.map(async (user) => {
        if (user.user1 !== req.session.userId) {
          const request = await database
            .findById(user.user1)
            .select("name _id");
          return {
            name: request.name,
            id: request._id,
          };
        }
      }),
    );
    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error occured please try again",
    });
  }
};

//user data display
exports.hostDetails = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.status(200).json({
      success: true,
      message: req.session.userName,
    });
  } else {
    return res.staus(500).json({
      success: false,
      message: "Unauthorised access please try again later!",
    });
  }
};
