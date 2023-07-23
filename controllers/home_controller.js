const Posts = require("../models/post");
const Users = require("../models/user_schema");

module.exports.home = async function (req, res) {
  try {
    let allUsers = await Users.find().sort({ name: 1 });
    let friends = [];
    if (req.user) {
      let user = await Users.findById(req.user._id).populate({
        path: "friends",
        populate: {
          path: "from_user to_user",
          select: "name",
        },
      });
      for (let el of user.friends) {
        if (el.from_user.id != req.user.id) {
          friends.push(el.from_user);
        }
        if (el.to_user.id != req.user.id) {
          friends.push(el.to_user);
        }
      }
      friends = friends.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(friends);
    }

    let posts = await Posts.find({})
      .sort("-createdAt")
      .populate(["user", "likes"])
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    const filterDate = function (e) {
      let date = e.toString().split("+");
      date = date.toString().split(" ");
      return date[1] + " " + date[2] + " " + date[3] + ", " + date[4];
    };
    res.render("home", { posts, filterDate, allUsers, friends });
  } catch (err) {
    console.log(err, "request failed");
  }
};
