// Import mongoose
const mongoose = require('mongoose');

// Routes handler
const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" // Referneces to the Post Model.
    },
    user:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});

// Export commentSchema.
module.exports = mongoose.model("Comment", commentSchema);