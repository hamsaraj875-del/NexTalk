//external modules

//internal modules
const database = require("../models/database");

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

exports.friends = (req, res, next) => {};

exports.searchUsers = async (req, res, next) => {
  try {
    const user = req.query;
    const list = await database
      .find({ name: { $regrex: name, options: "i" } })

    
    return res.status(200).json({
      success:true,
      message:list,
    })
  } catch {
    return res.status(201).json({
      success: false,
      message: "Search not found!",
    });
  }
};
