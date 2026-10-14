// Import Models.
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

        res.json({
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