// Import Mongoose.
const mongoose = require("mongoose");

// Routes Handler
const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user:{
        type: String,
        required: true
    }
});

// Export likeSchema.
module.exports = mongoose.model("Like", likeSchema);