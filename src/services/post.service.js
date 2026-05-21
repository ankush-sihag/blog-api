const postRepository = require('../repositories/post.repository');

const generateSlug = require('../utils/generateSlug');

const ApiError = require('../utils/ApiError');

const uploadToCloudinary = require('../utils/uploadToCloudinary');

const createNewPost = async (data, userId) => {

    const slug = generateSlug(data.title);

    const existingPosts = await postRepository.getAllPosts();

    const slugExists = existingPosts.find(
        (post) => post.slug === slug
    );

    if (slugExists) {

        throw new ApiError(404, 'Post not found');
    }

    let thumbnailUrl = '';
    if (data.thumbnail) {
        const uploadedImage = 
            await uploadToCloudinary(
                data.thumbnail.buffer,
                'blog-posts'
            );

            thumbnailUrl = uploadedImage.secure_url;
    };

    const post = await postRepository.createPost({
        title: data.title,
        content: data.content,
        status: data.status,
        category: data.category,
        tags: data.tags,
        thumbnail: thumbnailUrl,
        slug,
        author: userId
    });

    return post;
};

const getAllPosts = async (queryParams) => {

    const page =
        Number(queryParams.page) || 1;

    const limit =
        Number(queryParams.limit) || 10;

    const search =
        queryParams.search || '';

    const status =
        queryParams.status || '';

    const sort =
        queryParams.sort || 'latest';

    const result =
        await postRepository.getAllPosts({
            page,
            limit,
            search,
            status,
            sort
        });

    const totalPages = Math.ceil(
        result.totalPosts / limit
    );

    return {
        posts: result.posts,
        pagination: {
            currentPage: page,
            totalPages,
            totalPosts: result.totalPosts,
            limit
        }
    };
};

const getSinglePost = async (postId) => {

    const post = await postRepository.getPostById(postId);

    if (!post) {

        throw new ApiError(404, 'Post not found');
    }

    return post;
};

const updateSinglePost = async (
    postId,
    data
) => {

    const existingPost = await postRepository.getPostById(postId);

    if (!existingPost) {

        throw new ApiError(404, 'Post not found');
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

        throw new ApiError(404, 'Post not found');
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