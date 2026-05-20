const commentRepository = require(
    '../repositories/comment.repository'
);

const postRepository = require(
    '../repositories/post.repository'
);

const ApiError = require(
    '../utils/ApiError'
);

const createNewComment = async (
    data,
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

    const comment =
        await commentRepository.createComment({
            content: data.content,
            author: userId,
            post: postId
        });

    return comment;
};

const getPostComments = async (
    postId
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

    return commentRepository.getCommentsByPost(
        postId
    );
};

const getSingleComment = async (
    commentId
) => {

    const comment =
        await commentRepository.getCommentById(
            commentId
        );

    if (!comment) {

        throw new ApiError(
            404,
            'Comment not found'
        );
    }

    return comment;
};

const updateSingleComment = async (
    commentId,
    data
) => {

    const existingComment =
        await commentRepository.getCommentById(
            commentId
        );

    if (!existingComment) {

        throw new ApiError(
            404,
            'Comment not found'
        );
    }

    const updatedComment =
        await commentRepository.updateComment(
            commentId,
            {
                content: data.content
            }
        );

    return updatedComment;
};

const deleteSingleComment = async (
    commentId
) => {

    const existingComment =
        await commentRepository.getCommentById(
            commentId
        );

    if (!existingComment) {

        throw new ApiError(
            404,
            'Comment not found'
        );
    }

    await commentRepository.deleteComment(
        commentId
    );

    return;
};

module.exports = {
    createNewComment,
    getPostComments,
    getSingleComment,
    updateSingleComment,
    deleteSingleComment
};