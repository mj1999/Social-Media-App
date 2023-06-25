const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
app.use(cookieParser());
app.use(express.urlencoded());

const db = require("./config/mongoose");

const layout = require("express-ejs-layouts");
//static files
app.use(express.static("./assets"));
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

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Server started on port : ${port}`);
});
