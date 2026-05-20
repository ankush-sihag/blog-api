const postRepository = require(
    '../repositories/post.repository'
);

const ApiError = require(
    '../utils/ApiError'
);

const toggleLikePost = async (
    postId,
    userId
) => {

    const post =
        await postRepository.getPostById(
            postId
        );

    if (!post) {

        throw new ApiError(
            404,
            'Post not found'
        );
    }

    const alreadyLiked =
        post.likes.some(
            (id) =>
                id.toString() ===
                userId.toString()
        );

    if (alreadyLiked) {

        post.likes =
            post.likes.filter(
                (id) =>
                    id.toString() !==
                    userId.toString()
            );

    } else {

        post.likes.push(userId);
    }

    await post.save();

    return {
        likesCount:
            post.likes.length,
        isLiked:
            !alreadyLiked
    };
};

const toggleBookmarkPost = async (
    postId,
    userId
) => {

    const post =
        await postRepository.getPostById(
            postId
        );

    if (!post) {

        throw new ApiError(
            404,
            'Post not found'
        );
    }

    const alreadyBookmarked =
        post.bookmarks.some(
            (id) =>
                id.toString() ===
                userId.toString()
        );

    if (alreadyBookmarked) {

        post.bookmarks =
            post.bookmarks.filter(
                (id) =>
                    id.toString() !==
                    userId.toString()
            );

    } else {

        post.bookmarks.push(
            userId
        );
    }

    await post.save();

    return {
        bookmarksCount:
            post.bookmarks.length,
        isBookmarked:
            !alreadyBookmarked
    };
};

module.exports = {
    toggleLikePost,
    toggleBookmarkPost
};