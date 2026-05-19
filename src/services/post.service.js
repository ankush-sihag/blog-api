const postRepository = require('../repositories/post.repository');

const generateSlug = require('../utils/generateSlug');

const createNewPost = async (data, userId) => {

    const slug = generateSlug(data.title);

    const post = await postRepository.createPost({
        ...data,
        slug,
        author: userId
    });

    return post;
};

const getAllPosts = async () => {

    const posts = await postRepository.getAllPosts();

    return posts;
};

const getSinglePost = async (postId) => {

    const post = await postRepository.getPostById(postId);

    if (!post) {

        const error = new Error('Post not found');

        error.statusCode = 404;

        throw error;
    }

    return post;
};

const updateSinglePost = async (postId, data) => {

    const updatedPost = await postRepository.updatePost(
        postId,
        data
    );

    if (!updatedPost) {

        const error = new Error('Post not found');

        error.statusCode = 404;

        throw error;
    }

    return updatedPost;
};

const deleteSinglePost = async (postId) => {

    const deletedPost = await postRepository.deletePost(postId);

    if (!deletedPost) {

        const error = new Error('Post not found');

        error.statusCode = 404;

        throw error;
    }

    return deletedPost;
};

module.exports = {
    createNewPost,
    getAllPosts,
    getSinglePost,
    updateSinglePost,
    deleteSinglePost
};