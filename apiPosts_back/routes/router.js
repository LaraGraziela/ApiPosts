const express = require("express");
const PostsController = require("../controllers/PostsController");
const { Router } = require("express");
const CommentsController = require("../controllers/CommentsController");

const router = Router();

router.get("/posts", PostsController.find);
router.get("/posts/:id/comments", PostsController.findCommentsByPostId);
router.get("/posts/:id", PostsController.findById);
router.post("/posts", PostsController.create);
router.put("/posts/:id", PostsController.update);
router.delete("/posts/:id", PostsController.delete);

router.get("/comments", CommentsController.find);
router.get("/comments/:id", CommentsController.findById);
router.get("/comments/post/:postId", CommentsController.findByPostId);
router.post("/comments", CommentsController.create);
router.put("/comments/:id", CommentsController.update);
router.delete("/comments/:id", CommentsController.delete);

module.exports = router;
