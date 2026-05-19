const asyncHandler = require('../middleware/async.middleware');

const postService = require('../services/post.service');

const createPost = asyncHandler(async (req, res) => {

    const post = await postService.createNewPost(
        req.body,
        req.user._id
    );

    res.status(201).json({
        success: true,
        data: post
    });
});

const getPosts = asyncHandler(async (req, res) => {

    const posts = await postService.getAllPosts();

    res.status(200).json({
        success: true,
        data: posts
    });
});

module.exports = {
    createPost,
    getPosts
};