const Comment = require("../models/comment");
const Post = require("../models/post");
const Likes = require("../models/like");
const mongoose = require("mongoose");
module.exports.createComment = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postID);
    let comment = await Comment.create({
      content: req.body.comment,
      user: req.user._id,
      post: post._id,
    });
    post.comments.push(comment);
    post.save();
    if (req.xhr) {
      comment = await comment.populate("user", "name");
      res.status(200).json({
        data: {
          comment,
        },
        message: "comment added successfully",
      });
    }
    // res.redirect("back");
  } catch (err) {
    console.log("error while commenting", err);
  }

  // .then((post) => {
  //   console.log(post);

  //   Comment.create({
  //     content: req.body.comment,
  //     user: req.user._id,
  //     post: post._id,
  //   })
  //     .then((comment) => {
  //       post.comments.push(comment);
  //       post.save();
  //       res.redirect("back");
  //     })
  //     .catch((err) => {
  //       console.log("error while commenting", err);
  //     });
  // })
  // .catch((err) => {
  //   console.log("error finding post", err);
  // });
};
module.exports.delete = async function (req, res) {
  try {
    if (req.xhr) {
      let comment = await Comment.findById(req.body.commentID).populate({
        path: "post",
      });
      if (comment.post.user == req.user.id || comment.user == req.user.id) {
        comment.deleteOne();
        await Post.findByIdAndUpdate(comment.post.id, {
          $pull: { comments: req.query.commentID },
        });
        await Likes.deleteMany({ likeable: req.body.commentID });
      }
      res.status(200).json({
        data: { comment },
        message: "Comment Deleted!",
      });
    }
  } catch (err) {
    console.log("error deleting comment", err);
  }
};
