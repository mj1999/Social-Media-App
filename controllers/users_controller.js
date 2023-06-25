const User = require("../models/user_schema");

module.exports.profile = function (req, res) {
  //   User.findById(req.cookies.user_id).then((user) => {
  //     if (user) {
  //       res.render("user_profile", { user_name: user.name });
  //     } else {
  //       res.send('<h1>Please Login First<h1><a href="/auth/sign-in">Login</a>');
  //     }
  //   });
  res.render("user_profile");
};
module.exports.friendList = function (req, res) {
  res.send("<h1>My friends </h1>");
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
  return res.redirect("/");
};
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    console.log(err);
  });
  return res.redirect("/");
};
