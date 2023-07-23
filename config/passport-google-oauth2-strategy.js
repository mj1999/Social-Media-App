const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user_schema");

passport.use(
  new googleStrategy(
    {
      clientID:
        "770034676250-514ajfkud0ltmebjs1lsccan9e91jtp7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            })
              .then((user) => {
                return done(null, user);
              })
              .catch((err) => {
                console.log("Error creating user during google oauth", err);
              });
          }
        })
        .catch((err) => {
          console.log("Error with google oauth", err);
        });
    }
  )
);

module.exports = passport;
