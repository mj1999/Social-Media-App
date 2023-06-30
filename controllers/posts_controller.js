const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.createPost = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(() => {
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err, "error creating post");
    });
};
module.exports.delete = function (req, res) {
  Post.findById(req.query.postID)
    .then((post) => {
      if (post.user == req.user.id) {
        post.deleteOne();
        Comment.deleteMany({ post: req.query.postID })
          .then(() => {
            res.redirect("back");
          })
          .catch((err) => {
            console.log("error deleting comments:,", err);
          });
      }
    })
    .catch((err) => {
      console.log("error deleting post:,", err);
    });
};
