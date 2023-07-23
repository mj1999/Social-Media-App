const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const db = require("./config/mongoose");
const layout = require("express-ejs-layouts");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware.js");

app.use(cookieParser());
app.use(express.urlencoded());

//static files
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

//layout
app.use(layout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set views and view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "socialMedia",
    secret: "toor",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);

app.use(flash());
app.use(customMiddleware.setFlash);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Server started on port : ${port}`);
});
