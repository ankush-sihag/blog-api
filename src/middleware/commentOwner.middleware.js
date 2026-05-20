const asyncHandler = require(
    './async.middleware'
);

const commentRepository = require(
    '../repositories/comment.repository'
);

const ApiError = require(
    '../utils/ApiError'
);

const checkCommentOwnership =
    asyncHandler(
        async (
            req,
            res,
            next
        ) => {

            const comment =
                await commentRepository.getCommentById(
                    req.params.id
                );

            if (!comment) {

                throw new ApiError(
                    404,
                    'Comment not found'
                );
            }

            const isOwner =
                comment.author._id.toString() ===
                req.user._id.toString();

            const isAdmin =
                req.user.role === 'admin';

            if (
                !isOwner &&
                !isAdmin
            ) {

                throw new ApiError(
                    403,
                    'Not authorized to modify this comment'
                );
            }

            req.comment = comment;

            next();
        }
    );

module.exports =
    checkCommentOwnership;