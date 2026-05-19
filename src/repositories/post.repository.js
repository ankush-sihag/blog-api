const Post = require('../models/post.model');

const createPost = async (data) => {
    return Post.create(data);
};

const getAllPosts = async () => {
    return Post.find()
        .populate('author', 'name email')
        .sort({ createdAt: -1 });
};

const getPostById = async (id) => {
    return Post.findById(id)
        .populate('author', 'name email');
};

const updatePost = async (id, data) => {
    return Post.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

const deletePost = async (id) => {
    return Post.findByIdAndDelete(id);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};