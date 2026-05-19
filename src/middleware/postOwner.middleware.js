const asyncHandler = require('./async.middleware');

const postRepository = require(
    '../repositories/post.repository'
);

const checkPostOwnership = asyncHandler(
    async (req, res, next) => {

        const post = await postRepository.getPostById(
            req.params.id
        );

        if (!post) {

            const error = new Error(
                'Post not found'
            );

            error.statusCode = 404;

            throw error;
        }

        const isOwner =
            post.author._id.toString() ===
            req.user._id.toString();

        const isAdmin =
            req.user.role === 'admin';

        if (!isOwner && !isAdmin) {

            const error = new Error(
                'Not authorized to modify this post'
            );

            error.statusCode = 403;

            throw error;
        }

        req.post = post;

        next();
    }
);

module.exports = checkPostOwnership;