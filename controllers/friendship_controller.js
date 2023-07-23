const Friendship = require("../models/friendships");
const User = require("../models/user_schema");
module.exports.toggleFriend = async function (req, res) {
  let added = true;
  let existingFriendship = await Friendship.findOne({
    $or: [
      { from_user: req.body.fromUser, to_user: req.body.toUser },
      { from_user: req.body.toUser, to_user: req.body.fromUser },
    ],
  });
  let fromUser = await User.findById(req.body.fromUser);
  let toUser = await User.findById(req.body.toUser);
  if (existingFriendship) {
    console.log("exists");
    added = false;
    fromUser.friends.pull(existingFriendship.id);
    fromUser.save();
    toUser.friends.pull(existingFriendship.id);
    toUser.save();
    existingFriendship.deleteOne();
    return res.status(200).json({
      data: {
        added,
        friendship: existingFriendship,
      },
      message: "Request successfull, friend removed",
    });
  } else {
    console.log("not exists");
    let newFriendship = await Friendship.create({
      from_user: req.body.fromUser,
      to_user: req.body.toUser,
    });
    fromUser.friends.push(newFriendship);
    fromUser.save();
    toUser.friends.push(newFriendship);
    toUser.save();
    return res.status(200).json({
      data: {
        added,
        friendship: newFriendship,
      },
      message: "Request successfull, friend added",
    });
  }
};
