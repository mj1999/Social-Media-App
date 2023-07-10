const Posts = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Posts.find({})
    .sort("-createdAt")
    .populate("user", "-password")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });
  return res.status(200).json({
    message: "list of posts",
    posts: posts,
  });
};
module.exports.delete = async function (req, res) {
  try {
    // console.log(req.params.postID);
    let post = await Posts.findById(req.params.postID);
    console.log(post);
    post.deleteOne();
    await Comment.deleteMany({ post: req.params.postID });
    return res.status(200).json({
      message: "Post and associated comments delted",
    });
  } catch (err) {
    console.log("error deleting post:,", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
