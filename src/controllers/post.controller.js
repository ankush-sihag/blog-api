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

    const result =
        await postService.getAllPosts(
            req.query
        );

    res.status(200).json({
        success: true,
        pagination: result.pagination,
        data: result.posts
    });
});

const getPost = asyncHandler(async (req, res) => {

    const post = await postService.getSinglePost(
        req.params.id
    );

    res.status(200).json({
        success: true,
        data: post
    });
});

const updatePost = asyncHandler(async (req, res) => {

    const updatedPost =
        await postService.updateSinglePost(
            req.params.id,
            req.body
        );

    res.status(200).json({
        success: true,
        data: updatedPost
    });
});

const deletePost = asyncHandler(async (req, res) => {

    await postService.deleteSinglePost(
        req.params.id
    );

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully'
    });
});

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
};