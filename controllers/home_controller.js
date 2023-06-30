const Posts = require("../models/post");

module.exports.home = function (req, res) {
  Posts.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      const filterDate = function (e) {
        let date = e.toString().split("+");
        date = date.toString().split(" ");
        return date[1] + " " + date[2] + " " + date[3] + ", " + date[4];
      };
      res.render("home", { posts: posts, filterDate });
    })
    .catch((err) => {
      console.log(err, "posts not found/not present");
    });
};
