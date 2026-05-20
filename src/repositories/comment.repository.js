const Comment = require(
    '../models/comment.model'
);

const createComment = async (
    data
) => {

    return Comment.create(data);
};

const getCommentsByPost = async (
    postId
) => {

    return Comment.find({
        post: postId
    })
        .populate(
            'author',
            'name email'
        )
        .sort({ createdAt: -1 });
};

const getCommentById = async (
    commentId
) => {

    return Comment.findById(commentId)
        .populate(
            'author',
            'name email'
        );
};

const updateComment = async (
    commentId,
    data
) => {

    return Comment.findByIdAndUpdate(
        commentId,
        data,
        { new: true }
    );
};

const deleteComment = async (
    commentId
) => {

    return Comment.findByIdAndDelete(
        commentId
    );
};

module.exports = {
    createComment,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment
};