const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");
module.exports.createComment = function (req, res) {
  Post.findById(req.body.postID)
    .then((post) => {
      console.log(post);

      Comment.create({
        content: req.body.comment,
        user: req.user._id,
        post: post._id,
      })
        .then((comment) => {
          post.comments.push(comment);
          post.save();
          res.redirect("back");
        })
        .catch((err) => {
          console.log("error while commenting", err);
        });
    })
    .catch((err) => {
      console.log("error finding post", err);
    });
};
module.exports.delete = function (req, res) {
  Comment.findById(req.query.commentID)
    .populate({
      path: "post",
    })
    .then((comm) => {
      if (comm.post.user == req.user.id || comm.user == req.user.id) {
        comm.deleteOne();
        Post.findByIdAndUpdate(comm.post.id, {
          $pull: { comments: req.query.commentID },
        }).then(() => {
          res.redirect("back");
        });
      }
    })
    .catch((err) => {
      console.log("error deleting post:,", err);
    });
};
