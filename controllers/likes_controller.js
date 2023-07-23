const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    if (req.body.type == "Post") {
      likeable = await Post.findById(req.body.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.body.id).populate("likes");
    }
    let existingLike = await Like.findOne({
      likeable: req.body.id,
      onModel: req.body.type,
      user: req.user._id,
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.deleteOne();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.body.id,
        onModel: req.body.type,
      });
      likeable.likes.push(newLike);
      likeable.save();
      deleted = false;
    }
    return res.status(200).json({
      message: "Request Successfull",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
