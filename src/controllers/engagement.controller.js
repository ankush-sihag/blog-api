const asyncHandler = require(
    '../middleware/async.middleware'
);

const engagementService = require(
    '../services/engagement.service'
);

const ApiResponse = require(
    '../utils/ApiResponse'
);

const toggleLike = asyncHandler(
    async (req, res) => {

        const result =
            await engagementService.toggleLikePost(
                req.params.postId,
                req.user._id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                result.isLiked
                    ? 'Post liked successfully'
                    : 'Post unliked successfully',
                result
            )
        );
    }
);

const toggleBookmark =
    asyncHandler(
        async (req, res) => {

            const result =
                await engagementService.toggleBookmarkPost(
                    req.params.postId,
                    req.user._id
                );

            res.status(200).json(
                new ApiResponse(
                    200,
                    result.isBookmarked
                        ? 'Post bookmarked successfully'
                        : 'Bookmark removed successfully',
                    result
                )
            );
        }
    );

module.exports = {
    toggleLike,
    toggleBookmark
};