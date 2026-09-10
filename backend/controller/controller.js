//external modules

//internal modules
const database = require("../models/database");
const friends = require("../models/friends");
const messages = require("../models/messages");

//authenticating the user

exports.authenticate = (req, res, next) => {
  try {
    if (req.session.isLoggedIn) {
      return res.status(200).json({
        success: true,
        userId: req.session.userId,
        message: "The user is logged in",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "The user is not logged in ",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "The user is not logged in ",
    });
  }
};

//Friends search

exports.friends = async (req, res, next) => {
  try {
    const friendsList = await friends
      .find({
        $or: [
          { user1: req.session.userId, status: "accepted" },
          { user2: req.session.userId, status: "accepted" },
        ],
      })
      .populate("user1", "name")
      .populate("user2", "name");

    const result = friendsList.map((user) => {
      let name;
      let id;
      if (user.user1._id.toString() === req.session.userId) {
        name = user.user2.name;
        id = user.user2._id;
      } else {
        name = user.user1.name;
        id = user.user1._id;
      }
      return { name, id };
    });

    return res.status(200).json({
      success: true,
      message: result,
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
    const l = await database
      .find({ name: { $regex: name, $options: "i" } })
      .select("name _id");

    const list = l.filter((user) => user._id.toString() != req.session.userId);
    const result = await Promise.all(
      list.map(async (user) => {
        const friend = await friends.findOne({
          $or: [
            { user1: req.session.userId, user2: user._id },
            { user1: user._id, user2: req.session.userId },
          ],
        });

        let userStatus = "none";
        if (friend) {
          if (friend.status === "accepted") {
            userStatus = "accepted";
          } else if (friend.status === "pending") {
            userStatus =
              friend.user1.toString() === req.session.userId
                ? "pending_sent"
                : "pending_received";
          }
        }

        return {
          userId: user._id,
          userName: user.name,
          userStatus,
        };
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

    if (user1 === user2) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a friend request to yourself",
      });
    }

    const data = await friends.findOne({
      user1: user1,
      user2: user2,
      status: "pending",
    });
    if (data) {
      return res.json({
        success: false,
        message:
          "Invitation is already sent please wait util the user accept !",
      });
    }

    let check = await friends.findOne({
      $or: [
        { user1: user1, user2: user2, status: "accepted" },
        { user2: user1, user1: user2, status: "accepted" },
      ],
    });
    if (check) {
      return res.status(500).json({
        success: false,
        message: "Your guys are already friends",
      });
    }

    check = await friends.findOne({
      user1: user2,
      user2: user1,
      status: "pending",
    });
    if (check) {
      const result = await friends.findOneAndUpdate(
        { user1: user2, user2: user1, status: "pending" },
        { $set: { status: "accepted" } },
      );
      if (result) {
        return res.status(200).json({
          success: true,
          message: "Now " + name + " is your friend",
        });
      }
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
  const { id, name } = req.body;
  try {
    const result = await friends.findOneAndUpdate(
      { user1: id, user2: req.session.userId, status: "pending" },
      { $set: { status: "accepted" } },
    );
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Now " + name + " is your friend",
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
    const not = await friends.find({
      user2: req.session.userId,
      status: "pending",
    });
    notify = not.filter((user) => user.user1.toString() !== req.session.userId);
    const result = await Promise.all(
      notify.map(async (user) => {
        const request = await database.findById(user.user1).select("name _id");
        return {
          name: request.name,
          id: request._id,
          status: "pending",
        };
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
    const userId = req.session.userId;
    const userName = req.session.userName;
    return res.status(200).json({
      success: true,
      message: { userId, userName },
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Unauthorised access please try again later!",
    });
  }
};

//messages
exports.messages = async (req, res, next) => {
  try {
    const message = await messages
      .find({
        $or: [
          { senderId: req.session.userId },
          { receiverId: req.session.userId },
        ],
      })
      .select("senderId receiverId message time");
    const mes = message.map((mes) => {
      mes.status = "sent";
      return mes;
    });
    return res.status(200).json({
      success: true,
      message: mes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error occured",
    });
  }
};
