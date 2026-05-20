const mongoose = require('mongoose');
const { isLowercase } = require('validator');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true
        },

        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft'
        },

        tags: [
            {
                type: String,
                trim: true,
                lowercase: true
            }
        ],
    },
    {
        timestamps: true
    }
);

postSchema.index({
    title: 'text',
    content: 'text'
});

postSchema.index({
    status: 1
});

postSchema.index({
    createdAt: -1
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;