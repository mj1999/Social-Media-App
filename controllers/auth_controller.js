const userController = require("./users_controller");
module.exports.auth = {
  signIn: function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/users/profile");
      return;
    }
    res.render("login");
  },
  signUp: function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/users/profile");
      return;
    }
    res.render("register");
  },
  signOut: function (req, res) {
    if (req.isAuthenticated()) {
      userController.destroySession(res, res);
      return;
    }
  },
};
