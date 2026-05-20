const express = require('express');

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller');

const {
    protect
} = require('../middleware/auth.middleware');

const checkPostOwnership = require('../middleware/postOwner.middleware');

const {
    createPostValidator,
    updatePostValidator
} = require('../validators/post.validator');

const validate = require(
    '../validators/validationResult.validator'
);

const commentRoutes = require('./comment.routes');

const router = express.Router();

router.use(
    '/:postId/comments',
    commentRoutes
);

router.get('/', getPosts);

router.get('/:id', getPost);

router.post(
    '/',
    protect,
    createPostValidator,
    validate,
    createPost
);

router.put(
    '/:id',
    protect,
    checkPostOwnership,
    updatePostValidator,
    validate,
    updatePost
);

router.delete(
    '/:id',
    protect,
    checkPostOwnership,
    deletePost
);

module.exports = router;