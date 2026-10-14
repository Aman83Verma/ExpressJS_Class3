// Import Models.
const Post = require("../models/postModel");
const Like = require("../models/likeModel");


// Like Post
exports.likePost = async (req, res) => {
    try{
        const {post, user} = req.body;

        const like = new Like({post, user});

        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true} ).populate("likes").exec();

        res.status(200).json({
            post: updatedPost
        });
    }

    catch(error){
        return res.status(500).json({
            error: "Error while Liking Post.",
            message: error.message
        });
    }
};


// UnLike Post
exports.unlikePost = async (req, res) => {
    try{
        const {post, like} = req.body;

        // Find and Delete the Like Collection
        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        // Update and Post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id} }, {new: true} );

        res.status(200).json({
            post: updatedPost
        });
    }

    catch(error) {
        return res.status(500).json({
            error: "Error while Unliking Post.",
            message: error.message
        });
    }
}