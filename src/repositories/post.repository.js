const Post = require('../models/post.model');

const createPost = async (data) => {
    return Post.create(data);
};

const getAllPosts = async ({
    page,
    limit,
    search,
    status,
    sort
}) => {

    const query = {};

    if (search) {

        query.$text = {
            $search: search
        };
    }

    if (status) {

        query.status = status;
    }

    let sortOption = { createdAt: -1 };

    if (sort === 'oldest') {

        sortOption = { createdAt: 1 };
    }

    const posts = await Post.find(query)
        .populate('author', 'name email')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    return {
        posts,
        totalPosts
    };
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