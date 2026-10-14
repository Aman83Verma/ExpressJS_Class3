const express = require("express");

// Mapping with Routers.
const router = express.Router();

// Import the Controller
const {createPost, getAllPosts} = require("../controllers/PostController");
const {likePost, unlikePost} = require("../controllers/LikeController");
const {createComment} = require("../controllers/CommentController");


// Mapping Create

// Defining API Routes for creating Posts in Blog..
router.post("/posts/create", createPost);

// Defining API Routes for fetching Posts in Blog..
router.get("/posts", getAllPosts);

// Defining API Routes for Liking Posts in Blog..
router.post("/likes/like", likePost);

// Defining API Routes for Unliking Posts in Blog..
router.post("/likes/unlike", unlikePost);

// Defining API Routes for creating Comments in Blog..
router.post("/comments/create", createComment);


module.exports = router;