const express = require("express");
const {
  addPost,
  getAllPosts,
  addCommentToPost,
  getPostById,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);

router.post("/", addPost);

router.post("/addComment", addCommentToPost);

router.get("/:id", getPostById);

module.exports = router;
