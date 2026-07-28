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

exports.friends = async (req, res, next) => {
  try {
    const friendsList = await friends.find({
      $or: [{ user1: req.session.userId }, { user2: req.session.userId }],
    });
    return res.status(200).json({
      success: true,
      message: friendsList,
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while searching friends",
    });
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const {name} = req.query;
    const list = await database
      .find({ name: { $regex: name, $options: "i" } })
      .select("name _id");

    const result = await Promise.all(
      list.map(async (user) => {
        const friend = await friends.findOne({
          $or: [
            { user1: req.sessionId, user2: user._id },
            { user1: user._id, user2: req.sessionId },
          ],
        });
        return {
          userId: user._id,
          userName: user.name,
          userStatus: friend?.status || "none",
        };
      }),
    );
    return res.status(200).json({
      success:true,
      message:result,
    })
  } catch(err) {
    console.log(err);
    return res.status(201).json({
      success: false,
      message: "Search not found!",
    });
  }
};
