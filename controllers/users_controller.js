const User = require("../models/user_schema");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  if (req.query.userID) {
    User.findById(req.query.userID)
      .then((user) => {
        res.render("user_profile", { User: user });
      })
      .catch((err) => {
        console.log("user profile not found", err);
      });
  } else {
    res.render("user_profile", { User: null });
  }
};
module.exports.friendList = function (req, res) {
  res.send("<h1>My friends </h1>");
};
module.exports.update = async function (req, res) {
  if (req.params.id == req.user.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("___MulterError___", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            let fileDir = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(fileDir)) {
              fs.unlinkSync(fileDir);
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
      });
      // console.log(req.body);
      await User.findByIdAndUpdate(req.user.id, req.body);
      return res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  } else {
    req.flash("error", "Unauthenticated user");
    res.redirect("back");
  }
};
module.exports.create = function (req, res) {
  let userMail = req.body.email;
  if (!User.findOne({ email: userMail })) {
    User.create(req.body)
      .then((user) => {
        console.log("user created--", user);
      })
      .catch((err) => {
        console.error.bind(console, "Error creating user");
      });
  } else {
    console.log("user exists");
    res.send(
      '<h1>User Already present, redirection to login page...</h1><a href="/auth/sign-in">Login</a>'
    );
  }
};
module.exports.createSession = function (req, res) {
  req.flash("success", "logged in successfully");
  return res.redirect("/");
};
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    console.log(err);
  });
  req.flash("success", "you have logged out!");
  return res.redirect("/");
};
