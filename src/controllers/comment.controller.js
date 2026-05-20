const asyncHandler = require(
    '../middleware/async.middleware'
);

const commentService = require(
    '../services/comment.service'
);

const ApiResponse = require(
    '../utils/ApiResponse'
);

const createComment = asyncHandler(
    async (req, res) => {

        const comment =
            await commentService.createNewComment(
                req.body,
                req.params.postId,
                req.user._id
            );

        res.status(201).json(
            new ApiResponse(
                201,
                'Comment created successfully',
                comment
            )
        );
    }
);

const getComments = asyncHandler(
    async (req, res) => {

        const comments =
            await commentService.getPostComments(
                req.params.postId
            );

        res.status(200).json(
            new ApiResponse(
                200,
                'Comments fetched successfully',
                comments
            )
        );
    }
);

const getComment = asyncHandler(
    async (req, res) => {

        const comment =
            await commentService.getSingleComment(
                req.params.id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                'Comment fetched successfully',
                comment
            )
        );
    }
);

const updateComment = asyncHandler(
    async (req, res) => {

        const updatedComment =
            await commentService.updateSingleComment(
                req.params.id,
                req.body
            );

        res.status(200).json(
            new ApiResponse(
                200,
                'Comment updated successfully',
                updatedComment
            )
        );
    }
);

const deleteComment = asyncHandler(
    async (req, res) => {

        await commentService.deleteSingleComment(
            req.params.id
        );

        res.status(200).json(
            new ApiResponse(
                200,
                'Comment deleted successfully'
            )
        );
    }
);

module.exports = {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment
};