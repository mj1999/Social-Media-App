const express = require("express");
const router = express.Router();
const postApi = require("../../../controllers/api/v1/posts_api");
const passport = require("passport");

router.get("/", postApi.index);
router.delete(
  "/:postID",
  passport.authenticate("jwt", { session: false }),
  postApi.delete
);
module.exports = router;
