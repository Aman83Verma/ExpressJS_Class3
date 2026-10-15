// Import Models.
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Business Logic.
exports.createComment = async (req, res) => {
    try{
        // Fet data from request body
        const {post, user, body} = req.body;

        // Create a comment object
        const comment = new Comment({ post, user, body });

        // Save the new Comment into the database.
        const savedComment = await comment.save();

        // Find the Post by Id , add the new Comment to it's Comment Arrays.
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} }, {new: true} )
                            .populate("comments").exec();
                            // populate the comments array with comment documents

        res.status(200).json({
            post: updatedPost
        });
    }

    catch(error){
        return res.status(500).json({
            error: "Error while creating comments.",
            message: error.message
        });
    }
};


exports.deleteComment = async (req, res) => {
    try {
        // Get the comment ID from the URL
        const { commentId } = req.params;

        // Validate the comment ID
        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment ID."
            });
        }

        // Find and delete the comment
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        // Check whether the comment exists
        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });
        }

        // Remove the deleted comment ID from the Post
        await Post.findByIdAndUpdate(
            deletedComment.post,
            {
                $pull: {
                    comments: deletedComment._id
                }
            }
        );

        // Send the response
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully.",
            deletedComment: deletedComment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error while deleting comment.",
            message: error.message
        });
    }
};
