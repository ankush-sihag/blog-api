const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

commentSchema.index({
    createdAt: -1
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;