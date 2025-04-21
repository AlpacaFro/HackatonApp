const Post = require("../models/postModel.js");

async function addPost(req, res, next) {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
    });

    const response = await post.save();
    res.json({ postId: response.id });
  } catch (error) {
    next(error);
  }
}

async function getAllPosts(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const posts = await Post.find().limit(limit);

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

async function getPostById(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ post: post });
  } catch (error) {
    next(error);
  }
}

async function addCommentToPost(req, res, next) {
  try {
    const { postId, comment } = req.body;

    if (!postId || !comment || !comment.content) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    post.comments.push(comment);

    const response = await post.save();
    res.json({ post: response });
    console.log("Comment added successfully:", post);
  } catch (error) {
    console.error("Error adding comment:", error);
    next(error);
  }
}

module.exports = {
  addPost,
  getAllPosts,
  addCommentToPost,
  getPostById,
};
