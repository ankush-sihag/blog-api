const postRepository = require('../repositories/post.repository');

const generateSlug = require('../utils/generateSlug');

const createNewPost = async (data, userId) => {

    const slug = generateSlug(data.title);

    const existingPosts = await postRepository.getAllPosts();

    const slugExists = existingPosts.find(
        (post) => post.slug === slug
    );

    if (slugExists) {

        const error = new Error(
            'Post with similar title already exists'
        );

        error.statusCode = 400;

        throw error;
    }

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

const updateSinglePost = async (
    postId,
    data
) => {

    const existingPost = await postRepository.getPostById(postId);

    if (!existingPost) {

        const error = new Error('Post not found');

        error.statusCode = 404;

        throw error;
    }

    if (data.title) {

        data.slug = generateSlug(data.title);

    }

    const updatedPost = await postRepository.updatePost(
        postId,
        data
    );

    return updatedPost;
};

const deleteSinglePost = async (postId) => {

    const existingPost = await postRepository.getPostById(postId);

    if (!existingPost) {

        const error = new Error('Post not found');

        error.statusCode = 404;

        throw error;
    }

    await postRepository.deletePost(postId);

    return;
};

module.exports = {
    createNewPost,
    getAllPosts,
    getSinglePost,
    updateSinglePost,
    deleteSinglePost
};