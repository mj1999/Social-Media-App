const Post = require("../models/post");
const Comment = require("../models/comment");
const Likes = require("../models/like");
module.exports.createPost = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      post = await post.populate("user", "name");
      return res.status(200).json({
        data: {
          post,
        },
        message: "Post created!",
      });
    }
  } catch (err) {
    console.log(err, "error creating post");
  }
};
module.exports.delete = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postID);
    if (post.user == req.user.id) {
      post.deleteOne();
      try {
        await Comment.deleteMany({ post: req.body.postID });
        await Likes.deleteMany({ likeable: req.body.postID });
      } catch (err) {
        console.log("error deleting comments:,", err);
      }
    }
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post,
        },
        message: "Post deleted",
      });
    }
  } catch (err) {
    console.log("error deleting post:,", err);
  }
};
